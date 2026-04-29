export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMAdapter {
  generate(messages: LLMMessage[]): Promise<string>;
}

export class MockLLMAdapter implements LLMAdapter {
  async generate(messages: LLMMessage[]): Promise<string> {
    const last = messages[messages.length - 1]?.content ?? '';
    return `Mock 模型回复：我会围绕“${last.slice(0, 40)}”进行人类化讲解、举例和主动推进。`;
  }
}

export function createLLMAdapter(): LLMAdapter {
  // 这里保留真实模型接入点。当前项目默认使用 Mock，保证无需 API Key 即可运行。
  return new MockLLMAdapter();
}
