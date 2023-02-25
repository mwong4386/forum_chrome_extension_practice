import { m_DiscussionMessage } from "./m_DiscussionMessage";

export class m_Discussion {
  constructor(
    public id: string | undefined,
    public url: string,
    public topic: string,
    public type: string = "discussion",
    public replyCount: number,
    public createdBy: string,
    public createdAt: Date,
    public createdByDisplayName: string,
    public lastReplyBy: string,
    public lastReplyAt: Date,
    public lastReplyByDisplayName: string,
    public messages: m_DiscussionMessage[] | undefined = undefined,
    public tags: string[] = []
  ) {}
}

export class m_Discussion_Redirect {
  constructor(
    public id: string | undefined,
    public url: string,
    public topic: string,
    public type: string = "redirect",
    public createdBy: string,
    public createdAt: Date,
    public createdByDisplayName: string,
    public tags: string[] = [],
    public redirectUrl: string
  ) {}
}

export const discussionConverter = {
  toFirestore: function (m: m_Discussion) {
    const { id, messages, ...rest } = m;
    return {
      ...rest,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    if (data.type === "redirect") {
      return new m_Discussion_Redirect(
        snapshot.id,
        data.url,
        data.topic,
        data.type,
        data.createdBy,
        data.createdAt.toDate(),
        data.createdByDisplayName,
        data.tags ? data.tags : [],
        data.redirectUrl
      );
    }
    return new m_Discussion(
      snapshot.id,
      data.url,
      data.topic,
      data.type,
      data.replyCount,
      data.createdBy,
      data.createdAt.toDate(),
      data.createdByDisplayName,
      data.lastReplyBy,
      data.lastReplyAt.toDate(),
      data.lastReplyDisplayName,
      data.messages ? data.messages : [],
      data.tags ? data.tags : []
    );
  },
};
