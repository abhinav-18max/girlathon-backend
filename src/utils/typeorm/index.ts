import { SessionEntity } from './entities/session';
import { User } from '../../user/entities/user.entity';
import { Member } from '../../team/entities/member.entity';
import { Idea } from '../../idea/entities/idea.entity';
const entities = [SessionEntity, User, Member, Idea];
export default entities;

export { SessionEntity, User, Member, Idea };
