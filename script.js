// Inisialisasi aplikasi
document.addEventListener("DOMContentLoaded", function() {
    // Mendapatkan elemen-elemen DOM yang diperlukan
    const shelfUnfinished = document.getElementById("shelfUnfinished");
    const shelfFinished = document.getElementById("shelfFinished");
    const bookForm = document.getElementById("bookForm");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");

    // Mendefinisikan objek BookshelfApp
    const BookshelfApp = {
        // Properti untuk menyimpan data buku
        books: JSON.parse(localStorage.getItem("books")) || [],

        // Metode untuk menyimpan data buku ke dalam localStorage
        saveData: function() {
            localStorage.setItem("books", JSON.stringify(this.books));
        },

        // Metode untuk menambahkan buku baru ke dalam rak buku
        addBook: function(title, author) {
            const newBook = {
                id: +new Date(),
                title: title,
                author: author,
                isComplete: false
            };
            this.books.push(newBook);
            this.saveData();
            this.renderBooks();
        },

        // Metode untuk mengubah status buku (selesai/dalam proses)
        toggleBookStatus: function(bookId) {
            this.books.forEach(function(book) {
                if (book.id === bookId) {
                    book.isComplete = !book.isComplete;
                }
            });
            this.saveData();
            this.renderBooks();
        },

        // Metode untuk menghapus buku dari rak buku
        deleteBook: function(bookId) {
            this.books = this.books.filter(function(book) {
                return book.id !== bookId;
            });
            this.saveData();
            this.renderBooks();
        },

        // Metode untuk merender buku ke dalam rak buku
        renderBooks: function() {
            shelfUnfinished.innerHTML = "";
            shelfFinished.innerHTML = "";

            this.books.forEach(function(book) {
                const bookItem = document.createElement("li");
                bookItem.textContent = `${book.title} - ${book.author}`;
                const moveButton = document.createElement("button");
                moveButton.textContent = book.isComplete ? "Kembalikan" : "Selesaikan";
                moveButton.addEventListener("click", function() {
                    BookshelfApp.toggleBookStatus(book.id);
                });
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Hapus";
                deleteButton.addEventListener("click", function() {
                    BookshelfApp.deleteBook(book.id);
                });

                bookItem.appendChild(moveButton);
                bookItem.appendChild(deleteButton);

                if (book.isComplete) {
                    shelfFinished.appendChild(bookItem);
                } else {
                    shelfUnfinished.appendChild(bookItem);
                }
            });
        }
    };

    // Event listener untuk penambahan buku baru
    bookForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        if (title && author) {
            BookshelfApp.addBook(title, author);
            titleInput.value = "";
            authorInput.value = "";
        } else {
            alert("Judul dan penulis buku harus diisi!");
        }
    });

    // Render buku saat aplikasi dimuat
    BookshelfApp.renderBooks();
});
