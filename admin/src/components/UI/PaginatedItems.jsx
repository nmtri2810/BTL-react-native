import { Pagination } from "flowbite-react";

const PaginatedItems = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div className="my-8 flex justify-center">
            <Pagination
                currentPage={currentPage}
                onPageChange={(page) => {
                    setCurrentPage(page);
                }}
                showIcons
                totalPages={totalPages}
            />
        </div>
    );
};

export default PaginatedItems;
