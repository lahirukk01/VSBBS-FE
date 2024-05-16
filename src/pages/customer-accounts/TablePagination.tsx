import Pagination from 'react-bootstrap/Pagination';

type TPaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const TablePagination: React.FC<TPaginationProps> = ({totalPages, currentPage, onPageChange}) => {
  const pageNumbers = Array.from({length: totalPages}, (_, i) => i + 1);

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pageNumbers.map((page, index) => (
        <Pagination.Item
          key={index}
          active={page === currentPage}
          onClick={() => onPageChange(page - 1)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage)}
      />
    </Pagination>
  );
};

export default TablePagination;
