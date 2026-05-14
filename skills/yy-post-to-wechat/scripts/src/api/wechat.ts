import fs from 'fs';
import path from 'path';

export async function getAccessToken(appId: string, appSecret: string): Promise<string> {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;

  const response = await fetch(url);
  const data = (await response.json()) as AccessTokenResponse & WechatResponse;

  if (data.errcode) {
    throw new Error(`获取 Access Token 失败: ${data.errmsg} (code: ${data.errcode})`);
  }

  if (!data.access_token) {
    throw new Error('获取 Access Token 失败: 响应中没有 access_token');
  }

  return data.access_token;
}

export async function uploadImage(accessToken: string, filePath: string): Promise<string> {
  if (!fs.existsSync(filePath)) {
    throw new Error(`图片文件不存在: ${filePath}`);
  }

  const url = `https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=${accessToken}`;

  const formData = new FormData();
  const fileBlob = new Blob([fs.readFileSync(filePath)]);
  formData.append('media', fileBlob, path.basename(filePath));

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as UploadImageResponse & WechatResponse;

  if (data.errcode) {
    throw new Error(`上传图片失败: ${data.errmsg} (code: ${data.errcode})`);
  }

  if (!data.url) {
    throw new Error('上传图片失败: 响应中没有 url');
  }

  return data.url;
}

export async function uploadThumbMedia(accessToken: string, filePath: string): Promise<string> {
  const url = `https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=${accessToken}&type=image`;

  if (!fs.existsSync(filePath)) {
    throw new Error(`封面图片不存在: ${filePath}`);
  }

  const fileBlob = new Blob([fs.readFileSync(filePath)]);
  const formData = new FormData();
  formData.append('media', fileBlob, path.basename(filePath));

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = (await response.json()) as { media_id?: string } & WechatResponse;

  if (data.errcode) {
    throw new Error(`上传封面失败: ${data.errmsg} (code: ${data.errcode})`);
  }

  if (!data.media_id) {
    throw new Error('上传封面失败: 响应中没有 media_id');
  }

  return data.media_id;
}

export async function createDraft(accessToken: string, article: Article): Promise<string> {
  const url = `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${accessToken}`;

  const body = {
    articles: [article],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as CreateDraftResponse & WechatResponse;

  if (data.errcode) {
    throw new Error(`创建草稿失败: ${data.errmsg} (code: ${data.errcode})`);
  }

  if (!data.media_id) {
    throw new Error('创建草稿失败: 响应中没有 media_id');
  }

  return data.media_id;
}
