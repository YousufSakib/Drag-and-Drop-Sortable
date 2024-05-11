(function () {
    const sortableList = document.querySelector(".sortable-list");
    const items = document.querySelectorAll(".sortable-list .item");
    let draggingItem;
    let siblingsExceptDragging;

    items.forEach((item) => {
        item.addEventListener("dragstart", () => {
            item.classList.add("dragging");
            draggingItem = sortableList.querySelector(".dragging");
            siblingsExceptDragging = [
                ...sortableList.querySelectorAll(".item:not(.dragging)"),
            ];
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging");
        });
    });

    const initSortableList = (e) => {
        e.preventDefault();
        let mouseOnSibling = siblingsExceptDragging.find((sibling) => {
            return (
                sibling.offsetTop < e.clientY &&
                sibling.offsetTop + sibling.offsetHeight > e.clientY
            );
        });
        if (mouseOnSibling) {
            if (draggingItem.offsetTop > mouseOnSibling.offsetTop) {
                sortableList.insertBefore(draggingItem, mouseOnSibling);
            } else {
                sortableList.insertBefore(mouseOnSibling, draggingItem);
            }
            mouseOnSibling = null;
        }
    };

    document
        .getElementsByTagName("body")[0]
        .addEventListener("dragover", initSortableList);
})();
