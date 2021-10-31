import { toCell } from './cells';
import * as core from './core';
import * as styles from './styles';

describe('shortcut functions for styling', () => {
  const cells = [
    { value: undefined, coord: { row: 1, col: 2 } },
    toCell('abc'),
  ];

  cells.forEach((cell) => {
    it('number format shortcut function', () => {
      const styled = styles.setNumFmt('dd/mm/yyyy')(cell);
      expect(styled.style).toEqual({ numFmt: 'dd/mm/yyyy' });
    });

    it('fill shortcut function', () => {
      const fill = styles.toFill('none', 'red', 'black');
      const styled = styles.setFill(fill)(cell);
      expect(styled?.style?.fill).toEqual({
        type: 'pattern',
        pattern: 'none',
        fgColor: { argb: 'FFFF0000' },
        bgColor: { argb: 'FF000000' },
      });

      expect(styles.setSolidFg('white')(cell)?.style?.fill).toEqual({
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
      });

      expect(styles.setSolidBg('blue')(cell)?.style?.fill).toEqual({
        type: 'pattern',
        pattern: 'solid',
        bgColor: { argb: 'FF0000FF' },
      });
    });

    it('borders shortcut function', () => {
      const styled = core.pipe(
        cell,
        styles.setBorder('left', {}),
        styles.setBorder('top', styles.toBorder('thin', 'red')),
        styles.setBorder('bottom', styles.toBorder('dashDot', 'FFFFFFFF')),
        styles.setBorder('right', {
          style: 'medium',
          color: { argb: 'FFCCFFCC' },
        })
      );
      expect(styled?.style?.border).toEqual({
        left: {},
        top: {
          style: 'thin',
          color: { argb: 'FFFF0000' },
        },
        bottom: {
          style: 'dashDot',
          color: { argb: 'FFFFFFFF' },
        },
        right: {
          style: 'medium',
          color: { argb: 'FFCCFFCC' },
        },
      });
    });

    it('alignment shortcut functions', () => {
      const styled = core.pipe(
        cell,
        styles.setHorizontalAlignement('center'),
        styles.setVerticalAlignement('top'),
        styles.setWrapText(true)
      );
      expect(styled?.style?.alignment).toEqual({
        horizontal: 'center',
        vertical: 'top',
        wrapText: true,
      });
    });

    it('font shortcut functions', () => {
      const styled = core.pipe(
        cell,
        styles.setBold(true),
        styles.setItalic(true),
        styles.setUnderline(false),
        styles.setStrike(false),
        styles.setFontName('Roboto'),
        styles.setFontSize(4),
        styles.setFontColor('FF00FF00')
      );
      expect(styled?.style?.font).toEqual({
        bold: true,
        italic: true,
        underline: false,
        strike: false,
        name: 'Roboto',
        size: 4,
        color: { argb: 'FF00FF00' },
      });
    });
  });
});
