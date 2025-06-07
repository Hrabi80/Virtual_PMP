import { PartialType } from '@nestjs/swagger';
import { CreatePmpDto } from './create-pmp.dto';

export class UpdatePmpDto extends PartialType(CreatePmpDto) {}
