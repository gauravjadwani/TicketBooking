import MovieBooking from "./MovieBooking";

let i = new MovieBooking();
// i.insertNewMovie("Avengers");
console.log("test 1");
// i.insertNewMovie("apple 5623");

async function check() {
  let o = await i.enquireMovie("Avendgers");
  console.log("ooo", o);
}

async function testbookSeats() {
  let o = await i.bookSeats(5, "7608224464");
  console.log("ooo", o);
}
testbookSeats();
