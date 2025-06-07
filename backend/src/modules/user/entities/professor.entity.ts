import { Entity } from 'typeorm';
import { User } from './user.entity';

@Entity('professors')
export class PROFESSOR extends User {}
