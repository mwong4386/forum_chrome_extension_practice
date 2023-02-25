export class m_Message {
  constructor(
    public id: string | undefined = undefined,
    public url: string,
    public message: string,
    public createdBy: string | null = null,
    public createdAt: Date,
    public createdByDisplayName: string
  ) {}
}

export const messageConverter = {
  toFirestore: function (m: m_Message) {
    const { id, ...rest } = m;
    return {
      ...rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new m_Message(
      snapshot.id,
      data.url,
      data.message,
      data.createdBy,
      data.createdAt.toDate(),
      data.createdByDisplayName
    );
  },
};
