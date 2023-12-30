import {
	DataSource,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';
import { hash } from 'argon2';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	constructor(dataSource: DataSource) {
		dataSource.subscribers.push(this);
	}

	listenTo() {
		return User;
	}

	async beforeInsert(event: InsertEvent<User>) {
		event.entity.password = await hash(event.entity.password);
	}
	async beforeUpdate(event: UpdateEvent<User>) {
		if (event.entity.password)
			event.entity.password = await hash(event.entity.password);
	}
}
