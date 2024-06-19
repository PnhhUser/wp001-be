import {
    Entity,
    Column,
}
    from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity("products")
export class ProductEntity extends BaseEntity {

    @Column()
    productName: string;

}