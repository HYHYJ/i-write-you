/** @jsxImportSource @emotion/react */
import { Common } from '@/style/Common';
import { css } from '@emotion/react';

interface PaginationProps {
  total?: number;
  limit: number;
  page: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPage: React.SetStateAction<any>;
}

function LetterPagination({
  total = 16,
  limit,
  page,
  setPage,
}: PaginationProps) {
  const numPages = Math.ceil(total / limit);

  return (
    <nav css={navlayout}>
      <button
        css={buttonStyle}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array(numPages)
        .fill(0)
        .map((_, i) => (
          <button
            css={buttonStyle}
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </button>
        ))}
      <button
        css={buttonStyle}
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      >
        &gt;
      </button>
    </nav>
  );
}

export default LetterPagination;

const navlayout = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.25rem',
  margin: '1rem',
});

const buttonStyle = css({
  verticalAlign: 'baseline',
  border: 'none',
  borderRadius: '8px',
  padding: '8px',
  margin: 0,
  fontSize: '1.5rem',
  background: `${Common.colors.darkBrown}`,
  color: 'white',

  '&:hover': {
    background: `${Common.colors.lightYellow}`,
    cursor: 'pointer',
    transform: 'translateY(-2px)',
  },

  '&:disabled': {
    background: `${Common.colors.gray800}`,
    cursor: 'revert',
    transform: 'revert',
  },

  '&[aria-current]': {
    background: `${Common.colors.darkNavy}`,
    fontWeight: 'bold',
    cursor: 'revert',
    transform: 'revert',
  },
});
