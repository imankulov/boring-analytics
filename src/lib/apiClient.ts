import qs from 'qs';

export async function get<T>(url: string, params: Record<string, unknown>): Promise<T> {
	const queryString = qs.stringify(params);
	const response = await fetch(`/api/v1/${url}?${queryString}`);
	return response.json();
}
