import {
    Entity,
    Column,
}
    from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity("users")
export class UserEntity extends BaseEntity {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phonenumber: string;

    @Column({ default: 1 })
    role: number;

    @Column()
    apiKey: string;

    @Column({ nullable: true, type: 'text' })
    twoFASecret: string;

    @Column({ default: false, type: 'boolean' })
    enable2FA: boolean;
}