const header = {
  view: "toolbar",
  elements: [
    {
      template: "Sort list:",
      width: 150,
      borderless: true
    },
    {
      view: "modbutton",
      id: "modbutton",
      value: "Off",
      width: 120,
      states: { 0: "Off", 1: "Sort Asc", 2: "Sort Desc" },
      state: 0,
      on: {
        onStateChange: function (state) {
          const list = $$("list");
          if (state === 0) list.sort("id", "asc");
          else if (state === 1) list.sort("title", "asc");
          else if (state === 2) list.sort("title", "desc");
        }
      }
    }
  ]
};
const body = {
  view: "list",
  id: "list",
  template: "#rank#. #title# <div style='padding-left:18px'> Year:#year#, votes:#votes# </div>",
  type: {
    height: 60
  },
  data: [
    { id: 1, title: "The Shawshank Redemption", year: 1994, votes: 678790, rating: 9.2, rank: 1 },
    { id: 2, title: "The Godfather", year: 1972, votes: 511495, rating: 9.2, rank: 2 },
    { id: 3, title: "The Godfather: Part II", year: 1974, votes: 319352, rating: 9.0, rank: 3 },
    { id: 4, title: "The Good, the Bad and the Ugly", year: 1966, votes: 213030, rating: 8.9, rank: 4 },
    { id: 5, title: "My Fair Lady", year: 1964, votes: 533848, rating: 8.9, rank: 5 },
    { id: 6, title: "12 Angry Men", year: 1957, votes: 164558, rating: 8.9, rank: 6 }
  ]
};

export const task1 = {
  rows: [header, body],
  gravity: 2
};
