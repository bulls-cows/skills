/**
 * 微信公众号相关类型声明
 */

interface WechatResponse {
  errcode?: number;
  errmsg?: string;
}

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

interface UploadImageResponse extends WechatResponse {
  url: string;
}

interface CreateDraftResponse extends WechatResponse {
  media_id: string;
}

interface Article {
  title: string;
  author: string;
  digest: string;
  content: string;
  thumb_media_id: string;
  need_open_comment: number;
  only_fans_can_comment: number;
}
