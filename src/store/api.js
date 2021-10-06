export const fetchItem = function (id) {
  return new Promise((resolve) => {
    let result = [
      {title:'item1',content:`this is the content ,it's ID is: ${id}`},
      {title:'item22',content:`this is the content ,it's ID is: ${id}`},
      {title:'item3',content:`this is the content ,it's ID is: ${id}`},
      {title:'item4',content:`this is the content ,it's ID is: ${id}`},
      {title:'item5',content:`this is the content ,it's ID is: ${id}`},
      {title:'item6',content:`this is the content ,it's ID is: ${id}`},
      {title:'item7',content:`this is the content ,it's ID is: ${id}`},
    ];

    resolve(result[id] || {title:'--------'});
  });
};
