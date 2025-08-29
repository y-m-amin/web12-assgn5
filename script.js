document.addEventListener('DOMContentLoaded', () => {
  // Navbar
  const heartCountEl = document.querySelector('.heartcnt');
  const coinCountEl = document.querySelector('.coincnt');
  const copyCountEl = document.querySelector('.copycnt');

  // history and clear button
  const historySection = document.querySelector('.history');
  const clearBtn = document.querySelector('.clrhist');

  let heartCount = parseInt(heartCountEl?.textContent.trim(), 10) || 0;
  let coins = parseInt(coinCountEl?.textContent.trim(), 10) || 0;
  let copyCount =
    parseInt(
      (copyCountEl?.textContent || '').replace(' copy', '').trim(),
      10
    ) || 0;

  // count functions
  const setHeart = (v) => (heartCountEl.textContent = v);
  const setCoins = (v) => (coinCountEl.textContent = v);
  const setCopy = (v) => (copyCountEl.textContent = v + ' copy');

  // Format time
  function formatTimestamp(d = new Date()) {
    return d
      .toLocaleString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      .replace(',', '');
  }

  // add history
  function addHistoryItem({ name, number, when = new Date() }) {
    if (!historySection) return;

    const row = document.createElement('div');
    row.className =
      'flex items-center justify-between rounded-xl border border-gray-200 p-3';

    const left = document.createElement('div');

    const service = document.createElement('p');
    service.className = 'text-sm font-medium';
    service.textContent = name;

    const num = document.createElement('p');
    num.className = 'text-xs text-gray-500';
    num.textContent = number;

    left.appendChild(service);
    left.appendChild(num);

    const right = document.createElement('span');
    right.className = 'text-[18px] px-2 py-1 text-base';
    right.textContent = formatTimestamp(when);

    row.appendChild(left);
    row.appendChild(right);
    historySection.prepend(row);
  }

  // clear history
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (historySection) historySection.innerHTML = '';
    });
  }

  document.querySelectorAll('.card').forEach((card) => {
    // Heart icon
    const heartBtn = card.querySelector('.heart');
    if (heartBtn) {
      heartBtn.style.cursor = 'pointer';
      heartBtn.addEventListener('click', () => {
        heartCount += 1;
        setHeart(heartCount);
        heartBtn.classList.add('text-red-500');
        setTimeout(() => heartBtn.classList.remove('text-red-500'), 300);
      });
    }

    // Call button
    const callBtn = card.querySelector('.call');
    if (callBtn) {
      callBtn.addEventListener('click', () => {
        const name =
          card.querySelector('.service')?.textContent.trim() ||
          'Unknown Service';
        const number =
          card.querySelector('.number')?.textContent.trim() || 'N/A';

        if (coins < 20) {
          alert(
            `Not enough coins — ${coins} coin${
              coins === 1 ? '' : 's'
            } left, one call costs 20 coins`
          );
          return;
        }

        coins -= 20;
        setCoins(coins);

        alert(`Calling ${name} — ${number}`);
        addHistoryItem({ name, number, when: new Date() });
      });
    }

    // Copy button
    const copyBtn = card.querySelector('.copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const service =
          card.querySelector('.service')?.textContent.trim() ||
          'Unknown Service';
        const number =
          card.querySelector('.number')?.textContent.trim() || 'N/A';

        copyCount += 1;
        setCopy(copyCount);

        navigator.clipboard.writeText(number).then(
          () => {
            alert(`${service} ${number} copied to clipboard!`);
          },
          () => {
            alert(`Unable to copy ${number}`);
          }
        );
      });
    }
  });
});
