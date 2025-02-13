import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

const PagePagination = ({
	numOfPages,
	handlePageChange,
	page,
	handleNextPage,
	handlePrevPage,
}) => {
	const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
	const firstNumber = numbers[0];
	const lastNumber = numbers[numbers.length - 1];

	return (
		<Pagination className="my-6 dark:text-white">
			<PaginationContent>
				{firstNumber === page || (
					<PaginationItem onClick={handlePrevPage}>
						<PaginationPrevious />
					</PaginationItem>
				)}

				{numbers.map((number) => (
					<PaginationItem key={number} onClick={() => handlePageChange(number)}>
						<PaginationLink isActive={number === page}>{number}</PaginationLink>
					</PaginationItem>
				))}
				{lastNumber === page || (
					<PaginationItem onClick={handleNextPage}>
						<PaginationNext />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default PagePagination;
