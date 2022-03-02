export const initialState = {
  mainPosts: [{
    id:1,
    // 작성자의 ID
    User: {
      id:1,
      nickname: '하찌',
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [{
      src: 'https://media.vlpt.us/images/onezeun/post/8a5e0162-dc68-48c8-a94f-1e46054956c9/HAZZI.png'
    }, {
      src: 'https://media.vlpt.us/images/onezeun/post/10ab170e-5d49-46ac-8f84-772ff46ba90d/KakaoTalk_20220301_205613447.jpg'
    }, {
      src: 'https://media.vlpt.us/images/onezeun/post/279642fa-1ca3-45ea-b98b-9aeb7e526954/KakaoTalk_20220301_205701486.jpg'
    }],
    Comments: [{
      User: {
        nickname: 'onezeun',
      },
      content: '너무 귀여워요'
    }, {
      User: {
        nickname: 'babo',
      },
      content: '최고'
    }]
  }],
  imagePaths: [], // 이미지 경로 저장
  postAdded: false, // 게시글 추가 완료여부
}

// 게시글 작성
const ADD_POST = 'ADD_POST'; // 변수로 지정해 주면 오타 났을 경우 잘 알 수 있음
export const addPost = {
  type: ADD_POST,
}

// 가짜 객체
const dummyPost = {
  id: 2,
  content: '더미데이터입니다',
  User: {
    id: 1,
    nickname: 'onezeun',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      }
    default:
      return state;
  }
}

export default reducer;