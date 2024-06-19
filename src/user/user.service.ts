import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { UserDTO } from 'src/dto/user.dto';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) { }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ email: email });
    }

    async findByName(name: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ name: name });
    }

    async findByApiKey(apiKey: string): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ apiKey: apiKey });
    }

    async getById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOneBy({ id: id });
    }

    async getAll() {

        return await this.userRepository.find();
    }


    async create(userDTO: UserDTO): Promise<UserEntity> {

        return await this.userRepository.save(
            {
                ...userDTO,
                apiKey: uuid4(),
                createDate: new Date(),
                updateDate: new Date()
            });
    }

    async update(userDTO: UserDTO): Promise<UserEntity> {

        const userEntity: UserEntity = new UserEntity();

        userEntity.id = userDTO.id;
        userEntity.email = userDTO.email;
        userEntity.name = userDTO.name;
        userEntity.phonenumber = userDTO.phonenumber;
        userEntity.role = userDTO.role;
        userEntity.isDelete = userDTO.isDelete;
        userEntity.updateDate = new Date();


        return await this.userRepository.save(userEntity)
    }

    async remove(id: number): Promise<UserEntity> {

        const user = await this.getById(id);

        user.isDelete = true;

        return await this.userRepository.save(user)
    }

    async restone(id: number): Promise<UserEntity> {

        const user = await this.getById(id);

        user.isDelete = false;

        return await this.userRepository.save(user)
    }

    async updateSecretKey(userId, secret: string): Promise<UpdateResult> {
        return this.userRepository.update(
            { id: userId },
            {
                twoFASecret: secret,
                enable2FA: true,
            },
        );
    }
    async disable2FA(userId: number): Promise<UpdateResult> {
        return this.userRepository.update(
            { id: userId },
            {
                enable2FA: false,
                twoFASecret: null,
            },
        );
    }

}
