class ChatUI {
  constructor(list) {
    this.list = list;
  }

  clear() {
    this.list.innerHTML = " ";
  }
  render(data) {
    const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), {
      addSuffix: true,
    }); // dateFNS is must to be used
    const html = `
        <li class="list-group">
            <span class="username">${data.username} : <span class="message">${data.message}</span></span>
            <div class ="time">${when}</div>
        </li>
        `;

    this.list.innerHTML += html;
  }
}
