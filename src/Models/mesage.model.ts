import { Model } from 'objection';
import User from './user.model';

export class Message extends Model {
  static get tableName() {
    return 'messages'; // Name of the messages table in your database
  }

  id!: number;
  userId!: number;
  recipientId!: number;
  content!: string;
  timestamp!: Date;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'recipientId', 'content'],

      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        recipientId: { type: 'integer' },
        content: { type: 'string', minLength: 1 },
        timestamp: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.userId',
          to: 'users.id',
        },
      },
      recipient: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.recipientId',
          to: 'users.id',
        },
      },
    };
  }
}
