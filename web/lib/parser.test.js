import { parse } from './parser'

test('parse', () => {
  const input = `@all /ɔ:l/<br>*  tính từ<br>- tất cả, hết thảy, toàn bộ, suốt trọn, mọi<br>=all my life+ suốt đời tôi, trọn đời tôi<br>=all day+ suốt ngày<br>=with all speed+ hết tốc độ<br>=for all that+ mặc dù tất cả những cái đó<br>=all Vietnam+ toàn nước Việt Nam<br>=in all respects+ về mọi phương diện<br>*  danh từ<br>- tất cả, tất thảy, hết thảy, toàn thể, toàn bộ<br>=all of us+ tất cả chúng tôi; tất cả chúng ta<br>=all is over!+ thế là xong tất cả!<br>=all are unanimous to vote+ tất cả đều nhất trí bầu<br>=that's all I know+ đó là tất cả những điều tôi biết<br>=all but he+ tất cả trừ nó ra<br>!above all<br>- (xem) above<br>!after all<br>- (xem) after<br>!all but<br>- gần như, hầu như, suýt<br>=all but impossible+ gần như không thể làm được<br>=he was all but drowned+ hắn suýt chết đuối<br>!all and sundry<br>- toàn thể và từng người một, tất cả và từng cái một<br>!all one<br>- cũng vậy thôi<br>=it's all one to me+ đối với tôi thì cái đó cũng vậy thôi<br>=at all+ chút nào, chút nào chăng<br>=I don't know him at all+ tôi không biết hắn ta một chút nào<br>=in all+ tổng cộng, tất cả, cả thảy<br>!not at all<br>- không đâu, không chút nào<br>- không dám (lời đáp khi ai cảm ơn mình)<br>!nothing at all<br>- không một chút nào, không một tí gì<br>!once for all<br>- (xem) once<br>!one and all<br>- tất cả không trừ một ai; tất cả không trừ một cái gì<br>*  phó từ<br>- hoàn toàn, toàn bộ, tất cả, trọn vẹn<br>=to be dressed all in white+ mặc toàn trắng<br>=that's all wrong+ cái đó sai cả rồi<br>!all alone<br>- một mình, đơn độc<br>- không ai giúp đỡ, tự làm lấy<br>!all at once<br>- cùng một lúc<br>- thình lình, đột nhiên<br>!all in<br>- mệt rã rời, kiệt sức<br>!all over<br>- khắp cả<br>=all over the world+ khắp thế giới<br>=to be covered all over with mud+ bùn bẩn khắp người<br>- xong, hết, chấm dứt<br>=it's all over+ thế là xong, thế là hết<br>- hoàn toàn đúng là, y như hệt<br>=she is her mother all over+ cô ta y hệt như bà mẹ<br>!all there<br>- (thông tục) trí óc sáng suốt lành mạnh, không mất trí, không điên<br>=he is not quite all there+ anh ta mất trí rồi; trí óc anh ta không còn sáng suốt nữa rồi<br>!all the same<br>- cũng thế thôi, cũng vậy thôi, không có gì khác<br>=it was all the same to him+ cái đó đối với hắn thì cũng vậy thôi<br>=if it's all the same to you+ nếu đối với anh không phiền gì, nếu không phiền gì anh<br>- mặc dù thế nào, dù sao đi nữa<br>=he was punished all the same+ mặc dù thế nào hắn cũng cứ bị phạt<br>=all the same I ought to have stayed+ dù sao chăng nữa tôi phải ở lại thì phải<br>=thank you all the same+ tuy vậy tôi vẫn xin cám ơn anh (chị...)<br>!all the better<br>- càng hay, càng tốt<br>!all the more<br>- càng<br>!all the worse<br>- mặc kệ<br>!to be all attention<br>- rất chăm chú<br>!to be all ears<br>- (xem) ear<br>!to be all eyes<br>- (xem) eye<br>!to be all smimles<br>- luôn luôn tươi cười<br>!to be all legs<br>- (xem) leg<br>!graps all, lose all<br>- (xem) grasp<br>!it's all up with him<br>!it's all over with him<br>!it's all U.P. with him<br>- (từ lóng) thế là nó tong rồi, thế là nó tiêu ma rồi thế là nó đi đời rồi<br>!that's all there's to it<br>- (thông tục) đấy chỉ có thế thôi, không có gỉ phải nói thêm nữa<br>!it's (that's) all very well but...<br>- (xem) well`

  expect(parse(input)).toEqual({
    word: 'all',
    ipa: 'ɔ:l',
    alternatives: [],
    definitions: [
      {
        partOfSpeech: 'tính từ',
        definitions: [
          {
            meaning: 'tất cả, hết thảy, toàn bộ, suốt trọn, mọi',
            examples: [
              {
                text: 'all my life',
                translation: 'suốt đời tôi, trọn đời tôi',
              },
              {
                text: 'all day',
                translation: 'suốt ngày',
              },
              {
                text: 'with all speed',
                translation: 'hết tốc độ',
              },
              {
                text: 'for all that',
                translation: 'mặc dù tất cả những cái đó',
              },
              {
                text: 'all Vietnam',
                translation: 'toàn nước Việt Nam',
              },
              {
                text: 'in all respects',
                translation: 'về mọi phương diện',
              },
            ],
          },
        ],
        idioms: [],
      },
      {
        partOfSpeech: 'danh từ',
        definitions: [
          {
            meaning: 'tất cả, tất thảy, hết thảy, toàn thể, toàn bộ',
            examples: [
              {
                text: 'all of us',
                translation: 'tất cả chúng tôi; tất cả chúng ta',
              },
              {
                text: 'all is over!',
                translation: 'thế là xong tất cả!',
              },
              {
                text: 'all are unanimous to vote',
                translation: 'tất cả đều nhất trí bầu',
              },
              {
                text: "that's all I know",
                translation: 'đó là tất cả những điều tôi biết',
              },
              {
                text: 'all but he',
                translation: 'tất cả trừ nó ra',
              },
            ],
          },
        ],
        idioms: [
          {
            text: ['above all'],
            definitions: [{ meaning: '(xem) above' }],
          },
          {
            text: ['after all'],
            definitions: [{ meaning: '(xem) after' }],
          },
          {
            text: ['all but'],
            definitions: [
              {
                meaning: 'gần như, hầu như, suýt',
                examples: [
                  {
                    text: 'all but impossible',
                    translation: 'gần như không thể làm được',
                  },
                  {
                    text: 'he was all but drowned',
                    translation: 'hắn suýt chết đuối',
                  },
                ],
              },
            ],
          },
          {
            text: ['all and sundry'],
            definitions: [
              {
                meaning: 'toàn thể và từng người một, tất cả và từng cái một',
              },
            ],
          },
          {
            text: ['all one'],
            definitions: [
              {
                meaning: 'cũng vậy thôi',
                examples: [
                  {
                    text: "it's all one to me",
                    translation: 'đối với tôi thì cái đó cũng vậy thôi',
                  },
                  {
                    text: 'at all',
                    translation: 'chút nào, chút nào chăng',
                  },
                  {
                    text: "I don't know him at all",
                    translation: 'tôi không biết hắn ta một chút nào',
                  },
                  {
                    text: 'in all',
                    translation: 'tổng cộng, tất cả, cả thảy',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        partOfSpeech: 'phó từ',
        definitions: [
          {
            meaning: 'hoàn toàn, toàn bộ, tất cả, trọn vẹn',
            examples: [
              {
                text: 'to be dressed all in white',
                translation: 'mặc toàn trắng',
              },
              {
                text: "that's all wrong",
                translation: 'cái đó sai cả rồi',
              },
            ],
          },
        ],
        idioms: [
          {
            text: ['all alone'],
            definitions: [
              { meaning: 'một mình, đơn độc' },
              { meaning: 'không ai giúp đỡ, tự làm lấy' },
            ],
          },
          {
            text: ['all at once'],
            definitions: [{ meaning: 'cùng một lúc' }],
          },
          {
            text: ['all over'],
            definitions: [
              {
                meaning: 'khắp cả',
                examples: [
                  {
                    text: 'all over the world',
                    translation: 'khắp thế giới',
                  },
                  {
                    text: 'to be covered all over with mud',
                    translation: 'bùn bẩn khắp người',
                  },
                ],
              },
              {
                meaning: 'xong, hết, chấm dứt',
                examples: [
                  {
                    text: "it's all over",
                    translation: 'thế là xong, thế là hết',
                  },
                ],
              },
              {
                meaning: 'hoàn toàn đúng là, y như hệt',
                examples: [
                  {
                    text: 'she is her mother all over',
                    translation: 'cô ta y hệt như bà mẹ',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })
})
