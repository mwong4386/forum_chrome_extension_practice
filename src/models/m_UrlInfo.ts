export class m_UrlInfo {
  constructor(
    public id: string | undefined = undefined,
    public url: string,
    public tags: string[]
  ) {}
}

export const urlInfoConverter = {
  toFirestore: function (m: m_UrlInfo) {
    return {
      url: m.url,
      tags: m.tags,
    };
  },
  fromFirestore: function (snapshot: any, options: any) {
    const data = snapshot.data(options);
    return new m_UrlInfo(snapshot.id, data.url, data.tags);
  },
};
