function generate_board() {

    //============================================================================
    // Task 1
    // Retrieve the friend name(s) from the 'friends' multi-select dropdown menu
    //============================================================================

    // Array to contain the names of user-selected friend(s)
    // For example, if the user selected 'Darryl' and 'Yin Kit',
    //   this array's value will be:
    //      [ 'darryl', 'yinkit' ]
    //
    let friends = []; // Initialize to empty
    


    // YOUR CODE GOES HERE
    const friendsSelect = document.getElementById('friends');
    friends = Array.from(friendsSelect.selectedOptions).map(opt => opt.value);

    // Display user's selection in Developer Tools --> Console.
    console.log(friends);



    //============================================================================
    // Task 2
    // Given one or more selected friends and given 4 fruit names,
    //   generate a 'randomized' Array of finalized card names.
    // 
    // Card names are as follows:
    //    apple_brandon.png
    //    banana_brandon.png
    //    kiwi_brandon.png
    //    orange_brandon.png
    //
    // where 'brandon' can be replaced with another friend's name,
    // e.g.
    //    apple_nick.png
    // (and so on)
    //
    // Display all 4 fruit cards of one or more selected friends.
    //
    // NOTE: Each card must be displayed TWO and ONLY TWO times (thus, a "pair")
    //       (such that the user can attempt to 'match').
    //
    // Check out this utility function (declared at the bottom of this file)
    //   for randomizing the order of Array elements.
    //        shuffleArray()
    //============================================================================
    const fruits = [ 'apple', 'banana', 'kiwi', 'orange' ];

    // YOUR CODE GOES HERE

    const allCards = [];
    friends.forEach(friend => {
        fruits.forEach(fruit => {
            const filename = `${fruit}_${friend}.png`;
            allCards.push(filename, filename);
        });
    });

    const randomizedCards = shuffleArray(allCards);

    console.log('Total cards:', randomizedCards.length);
    console.log('Randomized deck:', randomizedCards);



    //============================================================================
    // Task 3
    // Display the cards in <div id="game-board">
    //
    // For this, we will make use of Template Literal (using backticks).
    //
    // NOTE: The game board will always have 4 columns and N rows, where N denotes
    //       (number of selected friends) x 2.
    //
    //       For example, if I chose 'Brandon', 'Darryl', and 'Nick' (3 friends),
    //         then the newly generated game board will be
    //         6 (rows) by 4 (columns).
    //============================================================================
    const num_cols = fruits.length;
    const num_rows = friends.length * 2;

    console.log("# of columns: " + num_cols)
    console.log("# of rows: " + num_rows);


    // YOUR CODE GOES HERE
    

    // You will need to rewrite the value of this result_str (String).
    let result_str = `
        <table id="board" style="border-collapse:separate;border-spacing:16px;margin:auto;">
    `;

    let idx = 0;
    for (let r = 0; r < num_rows; r++) {
        result_str += `<tr>`;
        for (let c = 0; c < num_cols; c++) {
            const filename = randomizedCards[idx++];
            result_str += `
                <td style="text-align:center;">
                    <img src="cards/${filename}" alt="${filename}" style="width:150px;height:auto;display:block;">
                </td>
            `;
        }
        result_str += `</tr>`;
    }

    result_str += `</table>`;


    // DO NOT MODIFY THE FOLLOWING
    // Replace the innerHTML of <div id="game-board">
    //   with a newly prepared HTML string (result_str).
    document.getElementById('game-board').innerHTML = result_str;
}


// Utility Function
// DO NOT MODIFY
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}