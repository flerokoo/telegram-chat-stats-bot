exports.config = {
  db: "data/database.sqlite",
  birthdayRemindDays: 7,
  timezone: "Europe/Moscow", // never change this
  gpt: {
    enabled: true,
    allowedChats: [-1001278382802, -1001799649218],
    historyLength: 200,
    completionParams: {
      model: "gpt-3.5-turbo-0125",
      temperature: 0.5,
      top_p: 0.8
    }
  }
};
