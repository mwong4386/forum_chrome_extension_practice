export class m_DiscussionMessage {
  constructor(
    public id: string | undefined,
    public message: string,
    public createdBy: string | null = null,
    public createdAt: Date,
    public createdByDisplayName: string
  ) {}
}

export const discussionMessageConverter = {
  toFirestore: function (m: m_DiscussionMessage) {
    const { id, ...rest } = m;
    return {
      ...rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new m_DiscussionMessage(
      snapshot.id,
      data.message,
      data.createdBy,
      data.createdAt.toDate(),
      data.createdByDisplayName
    );
  },
};
