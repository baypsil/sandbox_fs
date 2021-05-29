$(document).ready(function () {
    getBooks();
  });
  
  const getBooks = () => {
    $.ajax({
      type: "GET",
      url: "https://mybook-order.herokuapp.com/books",
      success: function (response) {
        //console.log(response)
        if (response.success) {
          response.data.forEach((books, i) => {
            const content = `<tr>
                                  <th>${i+1}</th>
                                  <td>${books.name}</td>
                                  <td>${books.type_book.name}</td>
                                  <td><button class="btn btn-outline-danger" onclick="deleteBooks(${books.id})" type="button">Delete</button></td>
                              </tr>`;
            $("#data-books").append(content);
          });
        }
      },
    });
  };
  
  const deleteBooks = (id) => {
      const payload = {id:id};
      $.ajax({
          type: "DELETE",
          url: "https://mybook-order.herokuapp.com/books",
          data: JSON.stringify(payload),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function (response) {
              if (response.success) {
                  $("#data-books").html("")
                  getBooks()
                  alert('Success');
                //   swal("Sukses!", "Berhasil Delete Data!", "success")
              }
          }
      });
  }
  
  const addBooks = () => {
    //const payload = {id:id};
    $.ajax({
        type: "POST",
        url: "https://mybook-order.herokuapp.com/books",
        data: JSON.stringify({"id":102,"type_books_id":7,"name":"tester2"}),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                $("#data-books").html("")
                getBooks();
            }
        }
    });
}

// $.ajax({
//     type: "POST",
//     contentType: "application/json; charset=utf-8",
//     url: WebServiceUrl,
//     data: JSON.stringify(DataToSend),
//     dataType: "json",
//     success: function (msg) {
//         alert('Success');
//     },
//     error: function (err){
//         alert('Error');
//     }
// });