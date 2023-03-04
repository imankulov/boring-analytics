import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export function formatBounceRate(bounceRate: number) {
	return `${(bounceRate * 100).toFixed(1)}%`;
}

export function formatBounceRateWithPlusSign(bounceRate: number) {
	const formatted = formatBounceRate(bounceRate);
	return bounceRate > 0 ? `+${formatted}` : formatted;
}

export function formatVisitDuration(visitDuration: number) {
	const duration = dayjs.duration(visitDuration, 'seconds');
	return duration.humanize();
}

export function formatVisitDurationWithPlusSign(visitDuration: number) {
	const formatted = `${visitDuration.toFixed(0)}s`;
	return visitDuration > 0 ? `+${formatted}` : formatted;
}

export function formatWithPlusSign(number: number) {
	return number > 0 ? `+${number.toLocaleString()}` : number.toLocaleString();
}
