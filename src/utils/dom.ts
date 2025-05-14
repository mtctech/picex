/**
 * 判断两个 URL 的后两个域名段（SLD + TLD）是否一致。
 * 例如：
 *  - "a.example.com"        → "example.com"
 *  - "b.test.example.co.uk" → "co.uk"
 *
 * @param url1 - 第一个 URL 字符串
 * @param url2 - 第二个 URL 字符串
 * @returns 如果两者最后两个域名段相同返回 true，否则返回 false
 */
export function isSameSecondLevelDomain(url1: string, url2: string): boolean {
	const extractLastTwo = (url: string): string | null => {
		try {
			// 解析并小写化 hostname
			const host: string = new URL(url).hostname.toLowerCase();
			// 正则捕获最后两段，例如 "example.com" 或 "co.uk"
			const match: RegExpMatchArray | null = host.match(/([^.]+\.[^.]+)$/);
			return match?.[1] ?? null;
		} catch {
			return null;
		}
	};

	const d1: string | null = extractLastTwo(url1);
	const d2: string | null = extractLastTwo(url2);

	return d1 !== null && d1 === d2;
}
