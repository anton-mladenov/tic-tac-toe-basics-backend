import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsJSON } from 'class-validator';

@Entity()
export default class Game extends BaseEntity {

	@PrimaryGeneratedColumn()
	id?: number

	@IsString()
	@Column("text", { nullable: false })
	name: string

	@IsString()
	@Column("text", { nullable: true })
	color?: string

	@IsJSON()
	@Column("simple-json", { nullable: true })
	board?: {}
}

