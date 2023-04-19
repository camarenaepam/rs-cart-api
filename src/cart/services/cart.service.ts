import { Injectable } from '@nestjs/common';

import { createDBConnection } from '../../db/db-client';

import { Cart } from '../models';

const GET_CART_LIST_QUERY = `select * from carts where user_id = $1`;
const GET_CART_ITEMS_LIST_QUERY = `select * from cart_items where cart_id = $1`;

const UPDATE_COUNT_CART_BY_ID_QUERY = `update cart_items set count = $2 where cart_id = $1 returning count`;

const DELETE_CART_QUERY = `delete from carts where user_id = $1 returning *`;

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  private dbClient;

  async findByUserId(userId: string): Promise<Cart> {
    try {
      this.dbClient = await createDBConnection();
      const cart = await this.dbClient.query(GET_CART_LIST_QUERY, [userId]);

      if (!cart) {
        throw new Error(`Cart not found`);
      }

      console.log(cart, "cart");
      const items = await this.dbClient.query(GET_CART_ITEMS_LIST_QUERY, [
        cart.rows[0]?.id,
      ]);

      return { id: cart.rows[0]?.id, items: items.rows };
    } catch (err) {
      console.log('Error on service getCarts: ', err);
      return err;
    }
  }

  async updateByUserId(
    userId: string,
    { id: cart_id }: Cart,
  ): Promise<Cart> {
    try {
      this.dbClient = await createDBConnection();

      const updated = await this.dbClient.query(UPDATE_COUNT_CART_BY_ID_QUERY, [
        cart_id,
        30,
      ]);

      return updated;
    } catch (err) {
      console.log('Error on service updateCartItem: ', err);
      return err;
    }
  }

    async removeByUserId(userId): Promise<void> {
      try {
        this.dbClient = await createDBConnection();
        await this.dbClient.query(DELETE_CART_QUERY, [userId]);
      } catch (err) {
        console.log('Error on service removeCartItem: ', err);
        return err;
      }
    }

}
