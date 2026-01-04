document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table");
  const headers = table.querySelectorAll("thead th");
  const tbody = table.querySelector("tbody");

  let currentSort = { index: 0, direction: "asc" };

  function toggleSort({ index, direction }) {
    return { index, direction: direction === "asc" ? "desc" : "asc" };
  }

  function changeSort(index) {
    return { index, direction: index === 0 ? "asc" : "desc" };
  }

  const getCellValue = (row, index) => row.children[index].textContent.trim();

  const starCount = (value) => value.length;

  headers.forEach((header, index) => {
    header.style.cursor = "pointer";

    header.addEventListener("click", () => {
      if (currentSort.index === index) {
        currentSort = toggleSort(currentSort);
      } else {
        currentSort = changeSort(index);
      }

      const rows = Array.from(tbody.querySelectorAll("tr"));
      rows.sort((a, b) => {
        const aVal = getCellValue(a, index);
        const bVal = getCellValue(b, index);

        if (index === 0) {
          return currentSort.direction === "asc"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        // Star columns → numeric (descending default)
        const diff = starCount(bVal) - starCount(aVal);
        return currentSort.direction === "desc" ? diff : -diff;
      });

      rows.forEach((row) => tbody.appendChild(row));
    });
  });
});
