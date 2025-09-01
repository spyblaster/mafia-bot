// Section 1: Initial Setup
const TELEGRAM_API = 'https://api.telegram.org/bot';

// Section 2: Data Structures and Constants
const FINAL_MOVE_CARDS = [
  'شهر در امان',
  'رای‌گیری در خفا',
  'جشن مافیا',
  'زهر آخر',
  'حدس آخر',
  'نبش قبر',
  'افشای هویت',
  'روز کوتاه',
  'سرشماری',
  'مستقل در منجلاب'
];

const SCENARIOS = {
  بازپرس: {
    10: {
      مافیا: ['رییس', 'ناتو', 'شیاد'],
      شهروند: ['دکتر', 'محقق', 'بازپرس', 'کارآگاه', 'شهروند_ساده1', 'شهروند_ساده2', 'رویین_تن']
    },
    12: {
      مافیا: ['رییس', 'ناتو', 'شیاد', 'مافیای_ساده'],
      شهروند: ['دکتر', 'محقق', 'کارآگاه', 'اسنایپر', 'بازپرس', 'شهروند_ساده2', 'شهروند_ساده1', 'رویین_تن']
    },
    13: {
      مافیا: ['رییس', 'ناتو', 'شیاد', 'مافیای_ساده'],
      شهروند: ['دکتر', 'محقق', 'کارآگاه', 'اسنایپر', 'بازپرس', 'شهروند_ساده1', 'شهروند_ساده2', 'شهروند_ساده3', 'رویین_تن']
    }
  },
  نماینده: {
    10: {
      مافیا: ['رییس', 'یاغی', 'هکر'],
      شهروند: ['دکتر', 'مین_گذار', 'وکیل', 'محافظ', 'راهنما', 'شهروند_ساده2', 'شهروند_ساده1']
    },
    12: {
      مافیا: ['رییس', 'ناتو', 'یاغی', 'هکر'],
      شهروند: ['سرباز', 'دکتر', 'مین_گذار', 'وکیل', 'محافظ', 'راهنما', 'شهروند_ساده2', 'شهروند_ساده1']
    },
    13: {
      مافیا: ['رییس', 'ناتو', 'یاغی', 'هکر'],
      شهروند: ['سرباز', 'دکتر', 'مین_گذار', 'وکیل', 'محافظ', 'راهنما', 'شهروند_ساده3', 'شهروند_ساده2', 'شهروند_ساده1']
    }
  },
  دراکولا: {
    9: {
      مافیا: ['دراکولا', 'خانم_وستنرا', 'رنفیلد'],
      شهروند: ['مرلین', 'فن_هلسینگ', 'سیوارد', 'گوردون', 'کشاورز1', 'کشاورز2']
    }
  },
  'شب مافیا': {
    14: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'جادوگر', 'شهردار', 'قاضی', 'قهرمان'],
      مستقل: ['سایه']
    },
    15: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'قهرمان'],
      مستقل: []
    },
    16: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'گورکن', 'رمال', 'جادوگر', 'کلانتر', 'کلانتر_ستاره_دار', 'شهردار', 'قاضی', 'قهرمان', 'دستکج'],
      مستقل: []
    },
    18: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب', 'معشوقه'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'گورکن_ستاره_دار', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'تفنگ_ساز', 'قهرمان'],
      مستقل: []
    },
    19: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب', 'معشوقه'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'گورکن_ستاره_دار', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'قهرمان', 'تفنگ_ساز'],
      مستقل: ['هزارچهره']
    },
    21: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب', 'معشوقه', 'کابوس'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'گورکن', 'گورکن_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'تفنگ_ساز', 'دستکج', 'افشاگر', 'قهرمان'],
      مستقل: []
    },
    22: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب', 'معشوقه', 'کابوس'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'گورکن_ستاره_دار', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'تفنگ_ساز', 'دستکج', 'افشاگر', 'قهرمان'],
      مستقل: ['هزارچهره']
    },
    24: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب', 'معشوقه', 'کابوس', 'بمب_ساز'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'گورکن_ستاره_دار', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'تفنگ_ساز', 'دستکج', 'افشاگر', 'بازپرس', 'فدایی', 'قهرمان'],
      مستقل: []
    },
    25: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب', 'معشوقه', 'کابوس', 'بمب_ساز'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'گورکن_ستاره_دار', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'تفنگ_ساز', 'دستکج', 'افشاگر', 'بازپرس', 'فدایی', 'قهرمان'],
      مستقل: ['هزارچهره']
    },
    26: {
      مافیا: ['رییس', 'جراح', 'شب_خسب', 'شاه_کش', 'جلب', 'معشوقه', 'کابوس', 'بمب_ساز'],
      شهروند: ['دکتر', 'دکتر_ستاره_دار', 'کلانتر', 'کلانتر_ستاره_دار', 'گورکن', 'گورکن_ستاره_دار', 'رمال', 'جادوگر', 'شهردار', 'قاضی', 'تفنگ_ساز', 'دستکج', 'افشاگر', 'بازپرس', 'فدایی', 'قهرمان'],
      مستقل: ['هزارچهره', 'ساغر']
    }
  }
};

// Section 3: Utility Functions
function isValidName(name) {
  const regex = /^[\u0600-\u06FF\s]{3,}$/;
  return regex.test(name);
}

function initializeFinalMoveCards(independentCount) {
  let cards = [...FINAL_MOVE_CARDS];
  if (independentCount === 0) {
    cards = cards.filter(card => card !== 'مستقل در منجلاب');
  }
  return {
    available: cards.map((card, index) => ({ card, number: index + 1 })),
    used: []
  };
}

function reassignCardNumbers(cards) {
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  return shuffled.map((card, index) => ({ ...card, number: index + 1 }));
}

// Section 4: Database Interactions
async function loadData(D1) {
  try {
    const [gameData, playerNames] = await Promise.all([
      D1.prepare('SELECT data FROM game_data WHERE id = ?').bind('game_config').first(),
      D1.prepare('SELECT data FROM player_names WHERE id = ?').bind('player_names').first()
    ]);

    const defaultData = {
      gameConfig: { step: 'init', godStep: 'none', playerState: {}, finalMoveCards: { available: [], used: [] } },
      players: {},
      rolesAssigned: [],
      rolesAvailable: []
    };

    return {
      cachedData: gameData?.data ? JSON.parse(gameData.data) : defaultData,
      cachedPlayerNames: playerNames?.data ? JSON.parse(playerNames.data) : {}
    };
  } catch (error) {
    console.error(`Error loading data from D1: ${error.message}`);
    return {
      cachedData: {
        gameConfig: { step: 'init', godStep: 'none', playerState: {}, finalMoveCards: { available: [], used: [] } },
        players: {},
        rolesAssigned: [],
        rolesAvailable: []
      },
      cachedPlayerNames: {}
    };
  }
}

async function saveData(D1, cachedData, cachedPlayerNames) {
  try {
    await D1.batch([
      D1.prepare('INSERT OR REPLACE INTO game_data (id, data) VALUES (?, ?)').bind('game_config', JSON.stringify(cachedData)),
      D1.prepare('INSERT OR REPLACE INTO player_names (id, data) VALUES (?, ?)').bind('player_names', JSON.stringify(cachedPlayerNames))
    ]);
  } catch (error) {
    console.error(`Error saving data to D1: ${error.message}`);
    throw error;
  }
}

// Section 5: Telegram API Interactions
async function deleteMessage(telegramToken, chatId, messageId) {
  try {
    const response = await fetch(`${TELEGRAM_API}${telegramToken}/deleteMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, message_id: messageId })
    });
    const result = await response.json();
    if (!result.ok) {
      console.error(`Failed to delete message: ${result.description}`);
    }
  } catch (error) {
    console.error(`Error deleting message: ${error.message}`);
  }
}

async function sendMessage(telegramToken, chatId, text, options = {}, autoDelete = false) {
  try {
    const response = await fetch(`${TELEGRAM_API}${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, ...options })
    });
    const result = await response.json();
    if (!result.ok) {
      console.error(`Failed to send message: ${result.description}`);
      return null;
    }
    if (autoDelete) {
      setTimeout(() => deleteMessage(telegramToken, chatId, result.result.message_id), 15000);
    }
    return result;
  } catch (error) {
    console.error(`Error sending message: ${error.message}`);
    return null;
  }
}

// Section 6: Game Logic
async function assignRole(rolesAvailable, rolesAssigned, players, playerId, name) {
  const availableRoles = rolesAvailable.filter(r => !rolesAssigned.includes(r));
  if (availableRoles.length === 0) {
    return { success: false, message: '🚫 هیچ نقشی برای تخصیص باقی نمانده است.' };
  }
  const role = availableRoles[Math.floor(Math.random() * availableRoles.length)];
  players[playerId] = { name, role };
  rolesAssigned.push(role);
  return { success: true, role };
}

// Section 7: Update Handler
async function handleUpdate(telegramToken, D1, env, update) {
  if (!update.message && !update.callback_query) return new Response('OK', { status: 200 });

  let chatId, text, userId, callbackData;
  if (update.callback_query) {
    chatId = update.callback_query.message.chat.id;
    text = update.callback_query.data;
    userId = update.callback_query.from.id;
    callbackData = text;
  } else {
    chatId = update.message.chat.id;
    text = update.message.text ? update.message.text.trim() : '';
    userId = update.message.from.id;
  }

  let { cachedData, cachedPlayerNames } = await loadData(D1);
  let { gameConfig, players, rolesAssigned, rolesAvailable } = cachedData;
  gameConfig = gameConfig || { step: 'init', godStep: 'none', playerState: {}, finalMoveCards: { available: [], used: [] } };
  players = players || {};
  rolesAssigned = rolesAssigned || [];
  rolesAvailable = rolesAvailable || [];
  gameConfig.finalMoveCards = gameConfig.finalMoveCards || { available: [], used: [] };

  // Handle /r command
  if (text === '/r') {
    gameConfig.previousStep = gameConfig.step;
    gameConfig.step = 'confirm_reset';
    gameConfig.godStep = 'none';
    cachedData.gameConfig = gameConfig;
    await sendMessage(telegramToken, chatId, '⚠️ آیا مطمئن هستید که می‌خواهید بازی را ریست کنید؟', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '✅ بله', callback_data: 'confirm_reset_yes' }],
          [{ text: '🚫 خیر', callback_data: 'confirm_reset_no' }]
        ]
      }
    });
    await saveData(D1, cachedData, cachedPlayerNames);
    return new Response('OK', { status: 200 });
  } else if (gameConfig.step === 'confirm_reset') {
    if (callbackData === 'confirm_reset_yes') {
      gameConfig.step = 'check_master_password_reset';
      gameConfig.godStep = 'none';
      cachedData.gameConfig = gameConfig;
      await sendMessage(telegramToken, chatId, '🔑 رمز مستر را وارد کنید:');
      await saveData(D1, cachedData, cachedPlayerNames);
      return new Response('OK', { status: 200 });
    } else if (callbackData === 'confirm_reset_no') {
      gameConfig.step = gameConfig.previousStep || 'init';
      gameConfig.godStep = 'none';
      cachedData.gameConfig = gameConfig;
      let message, replyMarkup;
      if (gameConfig.step === 'init') {
        message = '⏳ بازی هنوز آماده نیست. اگر گرداننده هستید، از /god استفاده کنید.';
        replyMarkup = {
          keyboard: [[{ text: '/god' }]],
          one_time_keyboard: true
        };
      } else if (gameConfig.step === 'set_game_password') {
        message = '🎲 رمز بازی را تعیین کنید:';
        replyMarkup = {};
      } else if (gameConfig.step === 'select_scenario') {
        message = '🎮 سناریو را انتخاب کنید:';
        replyMarkup = {
          keyboard: [['بازپرس'], ['نماینده'], ['دراکولا'], ['شب مافیا']],
          one_time_keyboard: true
        };
      } else if (gameConfig.step === 'select_player_count') {
        message = '🔢 تعداد پلیرها را انتخاب کنید:';
        replyMarkup = gameConfig.scenario === 'شب مافیا' ? {
          inline_keyboard: [
            [
              { text: '15', callback_data: 'player_count_15' },
              { text: '16', callback_data: 'player_count_16' },
              { text: '18', callback_data: 'player_count_18' }
            ],
            [
              { text: '19', callback_data: 'player_count_19' },
              { text: '21', callback_data: 'player_count_21' },
              { text: '22', callback_data: 'player_count_22' }
            ],
            [
              { text: '24', callback_data: 'player_count_24' },
              { text: '25', callback_data: 'player_count_25' },
              { text: '26', callback_data: 'player_count_26' }
            ]
          ]
        } : {
          keyboard: [['10'], ['12'], ['13']],
          one_time_keyboard: true
        };
      } else if (gameConfig.step === 'confirm_roles') {
        message = `📜 نقش‌ها:\n🕴️ مافیا:\n${gameConfig.roles.مافیا.map(r => `• ${r}`).join('\n')}\n\n🧑 شهروند:\n${gameConfig.roles.شهروند.map(r => `• ${r}`).join('\n')}${gameConfig.roles.مستقل && gameConfig.roles.مستقل.length > 0 ? `\n\n🦹 مستقل:\n${gameConfig.roles.مستقل.map(r => `• ${r}`).join('\n')}` : ''}\n\n✅ تأیید کنید:`;
        replyMarkup = {
          inline_keyboard: [
            [{ text: '✅ بله', callback_data: 'confirm_yes' }],
            [{ text: '🚫 خیر', callback_data: 'confirm_no' }]
          ]
        };
      } else {
        message = '🚫 ریست بازی لغو شد. 📋 دستورات شما:';
        replyMarkup = {
          keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
            [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
            [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
          one_time_keyboard: false
        };
      }
      await sendMessage(telegramToken, chatId, message, replyMarkup);
      await saveData(D1, cachedData, cachedPlayerNames);
      return new Response('OK', { status: 200 });
    }
  } else if (gameConfig.step === 'check_master_password_reset') {
    if (text === env.MASTER_PASSWORD) {
      cachedData.gameConfig = { step: 'init', godStep: 'none', playerState: {}, finalMoveCards: { available: [], used: [] } };
      cachedData.players = {};
      cachedData.rolesAssigned = [];
      cachedData.rolesAvailable = [];
      cachedPlayerNames = Object.fromEntries(
        Object.entries(cachedPlayerNames).filter(([userId]) => !userId.startsWith('god_'))
      );
      await saveData(D1, cachedData, cachedPlayerNames);
      await sendMessage(telegramToken, chatId, '✅ بات با موفقیت ریست شد. برای شروع بازی جدید، از /god استفاده کنید.');
    } else {
      await sendMessage(telegramToken, chatId, '🚫 رمز مستر اشتباه است. دوباره وارد کنید:');
    }
    return new Response('OK', { status: 200 });
  }

  // Handle /god command
  if (text === '/god' && !gameConfig.godChatId) {
    gameConfig.step = 'check_master_password_god';
    gameConfig.godStep = 'none';
    cachedData.gameConfig = gameConfig;
    await sendMessage(telegramToken, chatId, '🔑 رمز مستر را وارد کنید:');
    await saveData(D1, cachedData, cachedPlayerNames);
    return new Response('OK', { status: 200 });
  } else if (gameConfig.step === 'check_master_password_god') {
    if (text === env.MASTER_PASSWORD) {
      gameConfig.godChatId = chatId;
      gameConfig.step = 'set_game_password';
      gameConfig.godStep = 'none';
      cachedData.gameConfig = gameConfig;
      await sendMessage(telegramToken, chatId, '🎲 رمز بازی را تعیین کنید:');
      await saveData(D1, cachedData, cachedPlayerNames);
    } else {
      await sendMessage(telegramToken, chatId, '🚫 رمز مستر اشتباه است. دوباره وارد کنید:');
    }
    return new Response('OK', { status: 200 });
  }

  // Handle God Commands
  if (chatId === gameConfig.godChatId) {
    if (gameConfig.step === 'set_game_password') {
      gameConfig.gamePassword = text;
      gameConfig.step = 'select_scenario';
      gameConfig.godStep = 'none';
      await sendMessage(telegramToken, chatId, '🎮 سناریو را انتخاب کنید:', {
        reply_markup: {
          keyboard: [['بازپرس'], ['نماینده'], ['دراکولا'], ['شب مافیا']],
          one_time_keyboard: true
        }
      });
      cachedData.gameConfig = gameConfig;
      await saveData(D1, cachedData, cachedPlayerNames);
    } else if (gameConfig.step === 'select_scenario') {
      if (['بازپرس', 'نماینده', 'دراکولا', 'شب مافیا'].includes(text)) {
        gameConfig.scenario = text;
        rolesAssigned = []; // ریست rolesAssigned برای جلوگیری از تداخل با بازی قبلی
        if (text === 'دراکولا') {
          gameConfig.playerCount = 9;
          gameConfig.roles = SCENARIOS.دراکولا[9];
          rolesAvailable = [...gameConfig.roles.مافیا, ...gameConfig.roles.شهروند];
          gameConfig.step = 'confirm_roles';
          gameConfig.godStep = 'none';
          const roleMessage = `📜 نقش‌ها:\n🕴️ مافیا:\n${gameConfig.roles.مافیا.map(r => `• ${r}`).join('\n')}\n\n🧑 شهروند:\n${gameConfig.roles.شهروند.map(r => `• ${r}`).join('\n')}\n\n✅ تأیید کنید:`;
          await sendMessage(telegramToken, chatId, roleMessage, {
            reply_markup: {
              inline_keyboard: [
                [{ text: '✅ بله', callback_data: 'confirm_yes' }],
                [{ text: '🚫 خیر', callback_data: 'confirm_no' }]
              ]
            }
          });
        } else if (text === 'شب مافیا') {
          gameConfig.step = 'select_player_count';
          gameConfig.godStep = 'none';
          await sendMessage(telegramToken, chatId, '🔢 تعداد پلیرها را انتخاب کنید:', {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '14', callback_data: 'player_count_14' },
        { text: '15', callback_data: 'player_count_15' },
        { text: '16', callback_data: 'player_count_16' },
        { text: '18', callback_data: 'player_count_18' }
      ],
      [
        { text: '19', callback_data: 'player_count_19' },
        { text: '21', callback_data: 'player_count_21' },
        { text: '22', callback_data: 'player_count_22' }
      ],
      [
        { text: '24', callback_data: 'player_count_24' },
        { text: '25', callback_data: 'player_count_25' },
        { text: '26', callback_data: 'player_count_26' }
      ]
    ]
  }
});
        } else {
          gameConfig.step = 'select_player_count';
          gameConfig.godStep = 'none';
          await sendMessage(telegramToken, chatId, '🔢 تعداد پلیرها را انتخاب کنید:', {
            reply_markup: {
              keyboard: [['10'], ['12'], ['13']],
              one_time_keyboard: true
            }
          });
        }
        cachedData.gameConfig = gameConfig;
        cachedData.rolesAssigned = rolesAssigned; // ذخیره rolesAssigned ریست‌شده
        cachedData.rolesAvailable = rolesAvailable;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else {
        await sendMessage(telegramToken, chatId, '🚫 سناریو نامعتبر. دوباره انتخاب کنید:', {
          reply_markup: {
            keyboard: [['بازپرس'], ['نماینده'], ['دراکولا'], ['شب مافیا']],
            one_time_keyboard: true
          }
        });
      }
    } else if (gameConfig.step === 'select_player_count') {
      let count;
      if (gameConfig.scenario === 'شب مافیا' && callbackData && callbackData.startsWith('player_count_')) {
        count = parseInt(callbackData.replace('player_count_', ''));
      } else if (gameConfig.scenario !== 'شب مافیا') {
        count = parseInt(text);
      }
      const validCounts = gameConfig.scenario === 'شب مافیا' ? [14, 15, 16, 18, 19, 21, 22, 24, 25, 26] : [10, 12, 13];
      if (validCounts.includes(count)) {
        gameConfig.playerCount = count;
        gameConfig.roles = SCENARIOS[gameConfig.scenario][count];
        rolesAvailable = [
          ...gameConfig.roles.مافیا,
          ...gameConfig.roles.شهروند,
          ...(gameConfig.roles.مستقل || [])
        ];
        gameConfig.citizenCount = gameConfig.roles.شهروند.length;
        gameConfig.mafiaCount = gameConfig.roles.مافیا.length;
        gameConfig.independentCount = (gameConfig.roles.مستقل || []).length;
        gameConfig.finalMoveCards = initializeFinalMoveCards(gameConfig.independentCount);
        gameConfig.step = 'confirm_roles';
        gameConfig.godStep = 'none';
        const roleMessage = `📜 نقش‌ها:\n🕴️ مافیا:\n${gameConfig.roles.مافیا.map(r => `• ${r}`).join('\n')}\n\n🧑 شهروند:\n${gameConfig.roles.شهروند.map(r => `• ${r}`).join('\n')}${gameConfig.roles.مستقل && gameConfig.roles.مستقل.length > 0 ? `\n\n🦹 مستقل:\n${gameConfig.roles.مستقل.map(r => `• ${r}`).join('\n')}` : ''}\n\n✅ تأیید کنید:`;
        await sendMessage(telegramToken, chatId, roleMessage, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '✅ بله', callback_data: 'confirm_yes' }],
              [{ text: '🚫 خیر', callback_data: 'confirm_no' }]
            ]
          }
        });
        cachedData.gameConfig = gameConfig;
        cachedData.rolesAvailable = rolesAvailable;
        cachedData.rolesAssigned = rolesAssigned; // ذخیره rolesAssigned
        await saveData(D1, cachedData, cachedPlayerNames);
      } else {
        await sendMessage(telegramToken, chatId, `🚫 تعداد نامعتبر. ${gameConfig.scenario === 'شب مافیا' ? 'یکی از 15، 16، 18، 19، 21، 22، 24، 25 یا 26' : 'یکی از 10، 12 یا 13'} را انتخاب کنید:`, {
          reply_markup: gameConfig.scenario === 'شب مافیا' ? {
            inline_keyboard: [
              [
                { text: '15', callback_data: 'player_count_15' },
                { text: '16', callback_data: 'player_count_16' },
                { text: '18', callback_data: 'player_count_18' }
              ],
              [
                { text: '19', callback_data: 'player_count_19' },
                { text: '21', callback_data: 'player_count_21' },
                { text: '22', callback_data: 'player_count_22' }
              ],
              [
                { text: '24', callback_data: 'player_count_24' },
                { text: '25', callback_data: 'player_count_25' },
                { text: '26', callback_data: 'player_count_26' }
              ]
            ]
          } : {
            keyboard: [['10'], ['12'], ['13']],
            one_time_keyboard: true
          }
        });
      }
    } else if (gameConfig.step === 'confirm_roles') {
      if (text === 'بله' || callbackData === 'confirm_yes') {
        gameConfig.step = 'ready';
        gameConfig.godStep = 'none';
        await sendMessage(telegramToken, chatId, '🎉 بازی آماده است! پلیرها می‌توانند با ارسال رمز بازی نقش بگیرند.\n📋 دستورات شما:', {
          reply_markup: {
            keyboard: [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else if (text === 'خیر' || callbackData === 'confirm_no') {
        gameConfig.step = 'select_scenario';
        gameConfig.godStep = 'none';
        await sendMessage(telegramToken, chatId, '🎮 سناریو را انتخاب کنید:', {
          reply_markup: {
            keyboard: [['بازپرس'], ['نماینده'], ['دراکولا'], ['شب مافیا']],
            one_time_keyboard: true
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else {
        const roleMessage = `📜 نقش‌ها:\n🕴️ مافیا:\n${gameConfig.roles.مافیا.map(r => `• ${r}`).join('\n')}\n\n🧑 شهروند:\n${gameConfig.roles.شهروند.map(r => `• ${r}`).join('\n')}${gameConfig.roles.مستقل && gameConfig.roles.مستقل.length > 0 ? `\n\n🦹 مستقل:\n${gameConfig.roles.مستقل.map(r => `• ${r}`).join('\n')}` : ''}\n\n✅ تأیید کنید:`;
        await sendMessage(telegramToken, chatId, roleMessage, {
          reply_markup: {
            inline_keyboard: [
              [{ text: '✅ بله', callback_data: 'confirm_yes' }],
              [{ text: '🚫 خیر', callback_data: 'confirm_no' }]
            ]
          }
        });
      }
    } else if (gameConfig.step === 'ready' && gameConfig.godStep === 'none') {
      if (text === 'فهرست') {
        const mafiaList = gameConfig.roles.مافیا.map(role => {
          const player = Object.entries(players).find(([_, data]) => data.role === role);
          return player ? `• ${role} - ${player[1].name}` : null;
        }).filter(line => line !== null).join('\n') || 'هیچ';
        const citizenList = gameConfig.roles.شهروند.map(role => {
          const player = Object.entries(players).find(([_, data]) => data.role === role);
          return player ? `• ${role} - ${player[1].name}` : null;
        }).filter(line => line !== null).join('\n') || 'هیچ';
        const independentList = gameConfig.roles.مستقل?.length > 0
          ? gameConfig.roles.مستقل.map(role => {
              const player = Object.entries(players).find(([_, data]) => data.role === role);
              return player ? `• ${role} - ${player[1].name}` : null;
            }).filter(line => line !== null).join('\n') || 'هیچ'
          : '';
        const response = `📋 فهرست نقش‌ها:\n🕴️ مافیا:\n${mafiaList}\n\n🧑 شهروند:\n${citizenList}${independentList ? `\n\n🦹 مستقل:\n${independentList}` : ''}\n\n🔢 تعداد نقش‌های توزیع‌نشده: ${rolesAvailable.length - rolesAssigned.length}`;
        await sendMessage(telegramToken, chatId, response);
        await sendMessage(telegramToken, chatId, '📋 دستورات شما:', {
          reply_markup: {
            keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
              [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
              [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
      } else if (text === 'نقش دادن') {
        gameConfig.godStep = 'assign_role_set_name';
        await sendMessage(telegramToken, chatId, '✏️ نام پلیر را وارد کنید (فقط حروف فارسی، حداقل ۳ حرف):', {
          reply_markup: {
            inline_keyboard: [[{ text: '🚫 انصراف', callback_data: 'cancel_assign_role' }]]
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else if (text === 'پایان بازی') {
        gameConfig.godStep = 'confirm_end_game';
        await sendMessage(telegramToken, chatId, '⚠️ آیا مطمئن هستید که می‌خواهید بازی را پایان دهید؟', {
          reply_markup: {
            inline_keyboard: [
              [{ text: '✅ بله', callback_data: 'confirm_end_yes' }],
              [{ text: '🚫 خیر', callback_data: 'confirm_end_no' }]
            ]
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else if (text === 'کارت حرکت آخر' && gameConfig.scenario === 'شب مافیا') {
        if (rolesAssigned.length !== rolesAvailable.length) {
          await sendMessage(telegramToken, chatId, '🚫 همه نقش‌ها باید توزیع شده باشند تا بتوانید کارت حرکت آخر را انتخاب کنید.');
          await sendMessage(telegramToken, chatId, '📋 دستورات شما:', {
            reply_markup: {
              keyboard: [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
              one_time_keyboard: false
            }
          });
          return new Response('OK', { status: 200 });
        }
        if (gameConfig.finalMoveCards.available.length === 0) {
          await sendMessage(telegramToken, chatId, '🚫 هیچ کارت حرکت آخری باقی نمانده است.');
          await sendMessage(telegramToken, chatId, '📋 دستورات شما:', {
            reply_markup: {
              keyboard: [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']],
              one_time_keyboard: false
            }
          });
          return new Response('OK', { status: 200 });
        }
        gameConfig.godStep = 'select_final_move_card';
        await sendMessage(telegramToken, chatId, `🔍 لطفاً یک عدد از ۱ تا ${gameConfig.finalMoveCards.available.length} وارد کنید:`, {
          reply_markup: {
            inline_keyboard: [[{ text: '🚫 انصراف', callback_data: 'cancel_final_move_card' }]]
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else if (text === 'پاک‌سازی نقش‌ها') {
        gameConfig.godStep = 'confirm_clear_roles';
        await sendMessage(telegramToken, chatId, '⚠️ آیا همه نقش‌ها از نو توزیع شوند؟', {
          reply_markup: {
            inline_keyboard: [
              [{ text: '✅ بله', callback_data: 'confirm_clear_yes' }],
              [{ text: '🚫 خیر', callback_data: 'confirm_clear_no' }]
            ]
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else {
        await sendMessage(telegramToken, chatId, '📋 دستورات معتبر:\n• فهرست\n• نقش دادن\n• پایان بازی' + (gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ? '\n• کارت حرکت آخر' : '') + '\n• پاک‌سازی نقش‌ها', {
          reply_markup: {
            keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
              [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
              [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
      }
    } else if (gameConfig.godStep === 'assign_role_set_name') {
      if (callbackData === 'cancel_assign_role') {
        gameConfig.godStep = 'none';
        await sendMessage(telegramToken, chatId, '🚫 فرآیند تخصیص نقش لغو شد. 📋 دستورات شما:', {
          reply_markup: {
            keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
              [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
              [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else if (!isValidName(text)) {
        await sendMessage(telegramToken, chatId, '🚫 نام نامعتبر است. فقط حروف فارسی (حداقل ۳ حرف) مجاز است. دوباره وارد کنید یا انصراف دهید:', {
          reply_markup: {
            inline_keyboard: [[{ text: '🚫 انصراف', callback_data: 'cancel_assign_role' }]]
          }
        });
        return new Response('OK', { status: 200 });
      } else {
        const playerId = `god_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        const result = await assignRole(rolesAvailable, rolesAssigned, players, playerId, text);
        if (result.success) {
          cachedPlayerNames[playerId] = text;
          await saveData(D1, cachedData, cachedPlayerNames);
          await sendMessage(telegramToken, chatId, `✅ نقش ${result.role} به ${text} داده شد.`, {}, true);
          gameConfig.godStep = 'none';
          await sendMessage(telegramToken, chatId, '📋 دستورات شما:', {
            reply_markup: {
              keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
                [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
                [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
              one_time_keyboard: false
            }
          });
        } else {
          await sendMessage(telegramToken, chatId, result.message);
          gameConfig.godStep = 'none';
          await sendMessage(telegramToken, chatId, '📋 دستورات شما:', {
            reply_markup: {
              keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
                [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
                [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
              one_time_keyboard: false
            }
          });
        }
        cachedData.gameConfig = gameConfig;
        cachedData.players = players;
        cachedData.rolesAssigned = rolesAssigned;
        await saveData(D1, cachedData, cachedPlayerNames);
      }
    } else if (gameConfig.godStep === 'confirm_end_game') {
      if (callbackData === 'confirm_end_yes') {
        gameConfig.step = 'check_master_password_reset';
        gameConfig.godStep = 'none';
        cachedPlayerNames = Object.fromEntries(
          Object.entries(cachedPlayerNames).filter(([userId]) => !userId.startsWith('god_'))
        );
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
        await sendMessage(telegramToken, chatId, '🔑 رمز مستر را وارد کنید:');
      } else if (callbackData === 'confirm_end_no') {
        gameConfig.godStep = 'none';
        await sendMessage(telegramToken, chatId, '🚫 پایان بازی لغو شد. 📋 دستورات شما:', {
          reply_markup: {
            keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
              [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
              [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      }
    } else if (gameConfig.godStep === 'select_final_move_card' && gameConfig.scenario === 'شب مافیا') {
      if (callbackData === 'cancel_final_move_card') {
        gameConfig.godStep = 'none';
        await sendMessage(telegramToken, chatId, '🚫 فرآیند کارت حرکت آخر لغو شد. 📋 دستورات شما:', {
          reply_markup: {
            keyboard: [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
        return new Response('OK', { status: 200 });
      }
      const selectedNumber = parseInt(text);
      if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > gameConfig.finalMoveCards.available.length) {
        await sendMessage(telegramToken, chatId, `🚫 عدد نامعتبر است. لطفاً یک عدد از ۱ تا ${gameConfig.finalMoveCards.available.length} وارد کنید:`, {
          reply_markup: {
            inline_keyboard: [[{ text: '🚫 انصراف', callback_data: 'cancel_final_move_card' }]]
          }
        });
        return new Response('OK', { status: 200 });
      }
      const selectedCard = gameConfig.finalMoveCards.available.find(card => card.number === selectedNumber);
      if (selectedCard) {
        gameConfig.finalMoveCards.used.push(selectedCard.card);
        gameConfig.finalMoveCards.available = gameConfig.finalMoveCards.available.filter(card => card.number !== selectedNumber);
        gameConfig.finalMoveCards.available = reassignCardNumbers(gameConfig.finalMoveCards.available);
        gameConfig.godStep = 'none';
        await sendMessage(telegramToken, chatId, `🃏 کارت حرکت آخر: ${selectedCard.card}`);
        await sendMessage(telegramToken, chatId, '📋 دستورات شما:', {
          reply_markup: {
            keyboard: [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else {
        await sendMessage(telegramToken, chatId, `🚫 کارت یافت نشد. لطفاً یک عدد از ۱ تا ${gameConfig.finalMoveCards.available.length} وارد کنید:`, {
          reply_markup: {
            inline_keyboard: [[{ text: '🚫 انصراف', callback_data: 'cancel_final_move_card' }]]
          }
        });
      }
    } else if (gameConfig.godStep === 'confirm_clear_roles') {
      if (callbackData === 'confirm_clear_yes') {
        gameConfig.godStep = 'set_new_game_password';
        gameConfig.oldGamePassword = gameConfig.gamePassword;
        await sendMessage(telegramToken, chatId, '🎲 رمز بازی جدید را تعیین کنید (نباید با رمز قبلی یکسان باشد):');
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      } else if (callbackData === 'confirm_clear_no') {
        gameConfig.godStep = 'none';
        await sendMessage(telegramToken, chatId, '🚫 پاک‌سازی نقش‌ها لغو شد. 📋 دستورات شما:', {
          reply_markup: {
            keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
              [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
              [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
            one_time_keyboard: false
          }
        });
        cachedData.gameConfig = gameConfig;
        await saveData(D1, cachedData, cachedPlayerNames);
      }
    } else if (gameConfig.godStep === 'set_new_game_password') {
      if (text === gameConfig.oldGamePassword) {
        await sendMessage(telegramToken, chatId, '🚫 رمز جدید نمی‌تواند با رمز قبلی یکسان باشد. دوباره وارد کنید:');
        return new Response('OK', { status: 200 });
      }
      gameConfig.gamePassword = text;
      gameConfig.playerState = {};
      players = {};
      rolesAssigned = [];
      gameConfig.finalMoveCards = initializeFinalMoveCards(gameConfig.independentCount || 0);
      cachedPlayerNames = Object.fromEntries(
        Object.entries(cachedPlayerNames).filter(([userId]) => !userId.startsWith('god_'))
      );
      gameConfig.godStep = 'none';
      await sendMessage(telegramToken, chatId, '✅ نقش‌ها پاک‌سازی شدند و رمز جدید تنظیم شد. پلیرها می‌توانند با رمز جدید نقش بگیرند.\n📋 دستورات شما:', {
        reply_markup: {
          keyboard: gameConfig.scenario === 'شب مافیا' && rolesAssigned.length === rolesAvailable.length ?
            [['فهرست', 'نقش دادن'], ['پایان بازی', 'کارت حرکت آخر'], ['پاک‌سازی نقش‌ها']] :
            [['فهرست', 'نقش دادن'], ['پایان بازی'], ['پاک‌سازی نقش‌ها']],
          one_time_keyboard: false
        }
      });
      cachedData.gameConfig = gameConfig;
      cachedData.players = players;
      cachedData.rolesAssigned = rolesAssigned;
      await saveData(D1, cachedData, cachedPlayerNames);
    }
  }

  // Handle Player Commands
  if (gameConfig.step === 'ready' && chatId !== gameConfig.godChatId) {
    if (callbackData === 'change_name') {
      gameConfig.playerState = gameConfig.playerState || {};
      gameConfig.playerState[userId] = { step: 'change_name' };
      await sendMessage(telegramToken, chatId, '✏️ نام جدید خود را وارد کنید (فقط حروف فارسی، حداقل ۳ حرف):');
      cachedData.gameConfig = gameConfig;
      await saveData(D1, cachedData, cachedPlayerNames);
    } else if (gameConfig.playerState?.[userId]?.step === 'change_name') {
      if (!isValidName(text)) {
        await sendMessage(telegramToken, chatId, '🚫 نام نامعتبر است. فقط حروف فارسی (حداقل ۳ حرف) مجاز است. دوباره وارد کنید:');
        return new Response('OK', { status: 200 });
      }
      cachedPlayerNames[userId] = text;
      if (players[userId]) {
        players[userId].name = text;
      }
      await saveData(D1, cachedData, cachedPlayerNames);
      delete gameConfig.playerState[userId];
      await sendMessage(telegramToken, chatId, `✅ نام شما به ${text} تغییر کرد!`, {}, true);
      if (players[userId]) {
        await sendMessage(telegramToken, chatId, `✅ نام: ${text} | نقش: ${players[userId].role}`, {
          reply_markup: {
            inline_keyboard: [[{ text: '✏️ تغییر نام', callback_data: 'change_name' }]]
          }
        }, true);
      }
      cachedData.gameConfig = gameConfig;
      cachedData.players = players;
      await saveData(D1, cachedData, cachedPlayerNames);
    } else if (!players[userId]) {
      gameConfig.playerState = gameConfig.playerState || {};
      if (!gameConfig.playerState[userId] || gameConfig.playerState[userId].step !== 'set_name') {
        if (text === gameConfig.gamePassword) {
          const savedName = cachedPlayerNames[userId];
          if (savedName && isValidName(savedName)) {
            const result = await assignRole(rolesAvailable, rolesAssigned, players, userId, savedName);
            if (result.success) {
              await saveData(D1, cachedData, cachedPlayerNames);
              await sendMessage(telegramToken, chatId, `✅ نام: ${savedName} | نقش: ${result.role}`, {
                reply_markup: {
                  inline_keyboard: [[{ text: '✏️ تغییر نام', callback_data: 'change_name' }]]
                }
              }, true);
              delete gameConfig.playerState[userId];
              cachedData.gameConfig = gameConfig;
              cachedData.players = players;
              cachedData.rolesAssigned = rolesAssigned;
              await saveData(D1, cachedData, cachedPlayerNames);
            } else {
              await sendMessage(telegramToken, chatId, result.message);
              delete gameConfig.playerState[userId];
              cachedData.gameConfig = gameConfig;
              await saveData(D1, cachedData, cachedPlayerNames);
            }
          } else {
            gameConfig.playerState[userId] = { step: 'set_name' };
            await sendMessage(telegramToken, chatId, '✏️ نام خود را وارد کنید (فقط حروف فارسی، حداقل ۳ حرف):');
            cachedData.gameConfig = gameConfig;
            await saveData(D1, cachedData, cachedPlayerNames);
          }
        } else {
          await sendMessage(telegramToken, chatId, '🚫 رمز اشتباه است. دوباره وارد کنید:');
        }
      } else if (gameConfig.playerState[userId].step === 'set_name') {
        if (!isValidName(text)) {
          await sendMessage(telegramToken, chatId, '🚫 نام نامعتبر است. فقط حروف فارسی (حداقل ۳ حرف) مجاز است. دوباره وارد کنید:');
          return new Response('OK', { status: 200 });
        }
        const result = await assignRole(rolesAvailable, rolesAssigned, players, userId, text);
        if (result.success) {
          cachedPlayerNames[userId] = text;
          await saveData(D1, cachedData, cachedPlayerNames);
          await sendMessage(telegramToken, chatId, `✅ نام: ${text} | نقش: ${result.role}`, {
            reply_markup: {
              inline_keyboard: [[{ text: '✏️ تغییر نام', callback_data: 'change_name' }]]
            }
          }, true);
          delete gameConfig.playerState[userId];
          cachedData.gameConfig = gameConfig;
          cachedData.players = players;
          cachedData.rolesAssigned = rolesAssigned;
          await saveData(D1, cachedData, cachedPlayerNames);
        } else {
          await sendMessage(telegramToken, chatId, result.message);
          delete gameConfig.playerState[userId];
          cachedData.gameConfig = gameConfig;
          await saveData(D1, cachedData, cachedPlayerNames);
        }
      }
    } else {
      await sendMessage(telegramToken, chatId, `✅ شما قبلاً نقش گرفته‌اید: ${players[userId].role}`, {
        reply_markup: {
          inline_keyboard: [[{ text: '✏️ تغییر نام', callback_data: 'change_name' }]]
        }
      }, true);
    }
  } else if (chatId !== gameConfig.godChatId) {
    if (!gameConfig.godChatId) {
      await sendMessage(telegramToken, chatId, '⏳ بازی هنوز آماده نیست. اگر گرداننده هستید، دکمه‌ی زیر را بزنید:', {
        reply_markup: {
          keyboard: [[{ text: '/god' }]],
          one_time_keyboard: true
        }
      });
    } else {
      await sendMessage(telegramToken, chatId, '⏳ بازی هنوز آماده نیست، لطفا منتظر دریافت رمز بازی از گرداننده باشید.');
    }
  }

  return new Response('OK', { status: 200 });
}

// Section 8: Cloudflare Worker Handler
export default {
  async fetch(request, env) {
    if (!env.D1_DATABASE) {
      console.error('D1_DATABASE is not defined in environment variables');
      return new Response('D1 Database not configured', { status: 500 });
    }

    if (!env.TELEGRAM_BOT_TOKEN) {
      console.error('TELEGRAM_BOT_TOKEN is not defined in environment variables');
      return new Response('Telegram Bot Token not configured', { status: 500 });
    }

    const telegramToken = env.TELEGRAM_BOT_TOKEN;
    const D1 = env.D1_DATABASE;

    try {
      const update = await request.json();
      return await handleUpdate(telegramToken, D1, env, update);
    } catch (error) {
      console.error(`Error processing webhook: ${error.message}`);
      return new Response(`Error processing webhook: ${error.message}`, { status: 500 });
    }
  }
};
