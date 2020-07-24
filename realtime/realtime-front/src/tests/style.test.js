import { expect } from 'chai';
import { metricValue } from '../components/Metric/styles';

describe('getBorderStyleForDate', () => {
    it('returns grey when is beetwen min and max', () => {
        const min = 4;
        const max = 8;
        const metric = 7
        const expected = 'grey';
        const result = metricValue(metric, min, max)
        expect(result).to.equal(expected);
    });
    it('returns red when is out of range min and max', () => {
        const min = 4;
        const max = 8;
        const metric = 9
        const expected = 'red';
        const result = metricValue(metric, min, max)
        expect(result).to.equal(expected);
    });
});