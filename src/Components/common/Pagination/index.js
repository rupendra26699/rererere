
import ReactPaginate from "react-paginate"

// TODO Refactor styling to use tailwind custom variables

export default function Pagination({ pageCount, gotoPage, pageIndex }) {
    const onPageChange = (event) => {
        
        gotoPage(event.selected)

    }
    return (
        <nav aria-label="Page Navigation" className="mt-[20px]">
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={onPageChange}
                renderOnZeroPageCount={null}

                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageClassName="   border border-zinc-300 text-slate-600 cursor-pointer"
                breakClassName="  border border-zinc-300 text-slate-600"
                previousClassName="  border border-zinc-300 rounded-tl-[3px] rounded-bl-[3px] text-slate-400 "
                nextClassName="   border border-zinc-300 rounded-tr-[3px] rounded-br-[3px] text-slate-400 "
                breakLinkClassName="inline-block text-green-400 px-[15px] py-[9px] cursor-pointer"
                pageLinkClassName="inline-block text-slate-600  px-[15px] py-[9px]  cursor-pointer"
                previousLinkClassName="inline-block text-slate-600  px-[15px] py-[9px]  cursor-pointer"
                nextLinkClassName="inline-block text-slate-600  px-[15px] py-[9px]  cursor-pointer"
                activeClassName="bg-primary text-white"
                containerClassName="flex justify-end mb-[20px]"

                activeLinkClassName="text-white"


            />
        </nav>
    )
}