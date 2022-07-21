export const mockUser = {
  createdAt: '2022-07-04T23:08:09.490Z',
  description: 'description',
  email: 'xrafaelcruz@gmail.com',
  id: '3bf5bf25-9375-4601-8520-be9e0c91083c',
  name: 'Rafael Cruz',
  password: '',
  photo:
    'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
  pix: 'teste',
  updatedAt: '2022-07-04T23:08:09.492Z'
}

export const mockGroups = [
  {
    id: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    ownerUserEmail: 'xrafaelcruz@gmail.com',
    name: 'Grupo1',
    description: '',
    createdAt: '2022-05-31T21:05:05.893Z',
    updatedAt: '2022-05-31T21:05:05.894Z',
    total: 10
  },
  {
    id: 'b154da0f-2f91-40b7-9584-9cbde11658de',
    ownerUserEmail: 'xrafaelcruz@gmail.com',
    name: 'Grupao',
    description: '',
    createdAt: '2022-07-02T21:23:34.335Z',
    updatedAt: '2022-07-02T21:40:04.631Z',
    total: 110
  },
  {
    id: '18576abc-a138-4c9c-b071-8f3e8703ef74',
    ownerUserEmail: 'xrafaelcruz@gmail.com',
    name: 'Amigos 2000',
    description: '',
    createdAt: '2022-07-12T16:04:18.107Z',
    updatedAt: '2022-07-15T03:57:47.669Z',
    total: 2.88
  }
]

export const mockGroupsWithLimit = [
  ...mockGroups,
  {
    id: '1',
    ownerUserEmail: 'xrafaelcruz@gmail.com',
    name: 'Grupo1',
    description: '',
    createdAt: '2022-05-31T21:05:05.893Z',
    updatedAt: '2022-05-31T21:05:05.894Z',
    total: 10
  },
  {
    id: '2',
    ownerUserEmail: 'xrafaelcruz@gmail.com',
    name: 'Grupao',
    description: '',
    createdAt: '2022-07-02T21:23:34.335Z',
    updatedAt: '2022-07-02T21:40:04.631Z',
    total: 110
  },
  {
    id: '3',
    ownerUserEmail: 'xrafaelcruz@gmail.com',
    name: 'Amigos 2000',
    description: '',
    createdAt: '2022-07-12T16:04:18.107Z',
    updatedAt: '2022-07-15T03:57:47.669Z',
    total: 2.88
  }
]

export const mockGroup = {
  id: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
  ownerUserEmail: 'xrafaelcruz@gmail.com',
  name: 'Grupo1',
  description: '',
  createdAt: '2022-05-31T21:05:05.893Z',
  updatedAt: '2022-05-31T21:05:05.894Z',
  users: [
    {
      id: 'ed82781c-c680-426c-b4f0-e54e9421b60a',
      userEmail: 'xrafaelcruz@gmail.com',
      idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
      inviteStatus: 'aceito',
      createdAt: '2022-05-31T21:05:05.894Z',
      updatedAt: '2022-05-31T21:05:05.894Z'
    },
    {
      id: 'ebeba5fa-6e66-464e-bfcc-acd99cb5495d',
      userEmail: 'rafaelcruzx@gmail.com',
      idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
      inviteStatus: 'pendente',
      createdAt: '2022-05-31T21:05:05.894Z',
      updatedAt: '2022-05-31T21:05:05.894Z'
    }
  ],
  total: 10
}

export const mockUsersGroup = [
  {
    id: 'ed82781c-c680-426c-b4f0-e54e9421b60a',
    userEmail: 'xrafaelcruz@gmail.com',
    idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    inviteStatus: 'aceito',
    createdAt: '2022-05-31T21:05:05.894Z',
    updatedAt: '2022-05-31T21:05:05.894Z',
    user: {
      id: 'e502c025-6dfb-450b-b4f5-f4af9856f2d4',
      email: 'xrafaelcruz@gmail.com',
      name: 'Rafael Cruz',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
      pix: '123',
      description: 'abc',
      createdAt: '2022-05-31T21:04:27.385Z',
      updatedAt: '2022-06-21T17:55:34.303Z'
    }
  },
  {
    id: 'ebeba5fa-6e66-464e-bfcc-acd99cb5495d',
    userEmail: 'rafaelcruzx@gmail.com',
    idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    inviteStatus: 'pendente',
    createdAt: '2022-05-31T21:05:05.894Z',
    updatedAt: '2022-05-31T21:05:05.894Z',
    user: {
      id: 'cf5bce23-0cb9-493d-b088-37e66089ec68',
      email: 'rafaelcruzx@gmail.com',
      name: 'Rafael Cruz',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GiWFydrF_uBf0v1cx8faIvncYpKjCCocWHgKt43sA=s96-c',
      pix: '',
      description: '',
      createdAt: '2022-05-31T20:54:26.175Z',
      updatedAt: '2022-05-31T20:54:26.175Z'
    }
  }
]

export const mockInvites = [
  {
    id: '30167fee-ee8a-4024-be34-1a1d19fc882c',
    userEmail: 'xrafaelcruz@gmail.com',
    idGroup: '21586d92-bde6-4da5-9663-11c78f9ba23c',
    inviteStatus: 'pendente',
    createdAt: '2022-07-19T23:09:18.773Z',
    updatedAt: '2022-07-19T23:09:18.773Z',
    group: {
      id: '21586d92-bde6-4da5-9663-11c78f9ba23c',
      ownerUserEmail: 'rafaelcruzx@gmail.com',
      name: 'Teste05',
      description: '',
      createdAt: '2022-07-19T23:09:18.772Z',
      updatedAt: '2022-07-19T23:09:18.773Z'
    }
  }
]

export const mockPaymentsByUsers = [
  {
    from: 'andre.tanaka@prontmed.com',
    to: 'xrafaelcruz@gmail.com',
    total: 0.802,
    finalPayment: 0.327
  },
  {
    from: 'jorginho@prontmed.com',
    to: 'xrafaelcruz@gmail.com',
    total: 0.327,
    finalPayment: 0.327
  },
  {
    from: 'xrafaelcruz@gmail.com',
    to: 'andre.tanaka@prontmed.com',
    total: 0.47500000000000003,
    finalPayment: 0
  }
]

export const mockPaymentsByExpense = [
  {
    id: '8668cda0-0fb6-4408-b482-0144959861f5',
    idExpense: '56f10f59-5655-4678-9407-59d82e83614c',
    userEmail: 'andre.tanaka@prontmed.com',
    idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
    paymentValue: '0.327',
    paymentStatus: 'pendente',
    createdAt: '2022-07-13T03:29:25.868Z',
    updatedAt: '2022-07-13T03:29:25.868Z',
    expense: {
      id: '56f10f59-5655-4678-9407-59d82e83614c',
      userEmail: 'xrafaelcruz@gmail.com',
      idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
      name: 'asasasas',
      value: '0.98',
      description: '',
      type: 'não informado',
      createdAt: '2022-07-12T16:14:28.416Z',
      updatedAt: '2022-07-13T03:29:25.857Z',
      user: {
        id: 'e502c025-6dfb-450b-b4f5-f4af9856f2d4',
        email: 'xrafaelcruz@gmail.com',
        name: 'Rafael Cruz',
        password: '',
        photo:
          'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
        pix: '123',
        description: 'abc',
        createdAt: '2022-05-31T21:04:27.385Z',
        updatedAt: '2022-06-21T17:55:34.303Z'
      }
    },
    user: {
      id: '7f036084-68eb-4271-a171-209c957b10d0',
      email: 'andre.tanaka@prontmed.com',
      name: 'Andre Tanaka',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AFdZucrk9bT4RqJN7-FgOWoWYxlx5XZ032O8CkxhnBSn=s96-c',
      pix: 'tanaka.s.andre@gmail.com',
      description: '',
      createdAt: '2022-07-12T15:43:59.074Z',
      updatedAt: '2022-07-12T15:48:26.696Z'
    }
  },
  {
    id: '640740ea-57f1-49b6-a949-417fe9ec36ef',
    idExpense: '56f10f59-5655-4678-9407-59d82e83614c',
    userEmail: 'jorginho@prontmed.com',
    idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
    paymentValue: '0.327',
    paymentStatus: 'pendente',
    createdAt: '2022-07-13T03:29:25.868Z',
    updatedAt: '2022-07-13T03:29:25.869Z',
    expense: {
      id: '56f10f59-5655-4678-9407-59d82e83614c',
      userEmail: 'xrafaelcruz@gmail.com',
      idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
      name: 'asasasas',
      value: '0.98',
      description: '',
      type: 'não informado',
      createdAt: '2022-07-12T16:14:28.416Z',
      updatedAt: '2022-07-13T03:29:25.857Z',
      user: {
        id: 'e502c025-6dfb-450b-b4f5-f4af9856f2d4',
        email: 'xrafaelcruz@gmail.com',
        name: 'Rafael Cruz',
        password: '',
        photo:
          'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
        pix: '123',
        description: 'abc',
        createdAt: '2022-05-31T21:04:27.385Z',
        updatedAt: '2022-06-21T17:55:34.303Z'
      }
    },
    user: {
      id: '61830fa4-2b2c-4e22-9910-55a64701dff0',
      email: 'jorginho@prontmed.com',
      name: '',
      password: '',
      photo: '',
      pix: '',
      description: '',
      createdAt: '2022-07-12T16:13:04.440Z',
      updatedAt: '2022-07-12T16:13:04.441Z'
    }
  },
  {
    id: 'd06fc738-bcc9-4236-8437-8f3cc33ef165',
    idExpense: '19a9dafa-f3ca-4e0d-8d71-37675088be0b',
    userEmail: 'andre.tanaka@prontmed.com',
    idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
    paymentValue: '0.475',
    paymentStatus: 'pendente',
    createdAt: '2022-07-13T03:29:14.919Z',
    updatedAt: '2022-07-13T03:29:14.920Z',
    expense: {
      id: '19a9dafa-f3ca-4e0d-8d71-37675088be0b',
      userEmail: 'xrafaelcruz@gmail.com',
      idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
      name: 'qwewqe',
      value: '0.95',
      description: '',
      type: 'não informado',
      createdAt: '2022-07-12T16:05:40.108Z',
      updatedAt: '2022-07-13T03:29:14.902Z',
      user: {
        id: 'e502c025-6dfb-450b-b4f5-f4af9856f2d4',
        email: 'xrafaelcruz@gmail.com',
        name: 'Rafael Cruz',
        password: '',
        photo:
          'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
        pix: '123',
        description: 'abc',
        createdAt: '2022-05-31T21:04:27.385Z',
        updatedAt: '2022-06-21T17:55:34.303Z'
      }
    },
    user: {
      id: '7f036084-68eb-4271-a171-209c957b10d0',
      email: 'andre.tanaka@prontmed.com',
      name: 'Andre Tanaka',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AFdZucrk9bT4RqJN7-FgOWoWYxlx5XZ032O8CkxhnBSn=s96-c',
      pix: 'tanaka.s.andre@gmail.com',
      description: '',
      createdAt: '2022-07-12T15:43:59.074Z',
      updatedAt: '2022-07-12T15:48:26.696Z'
    }
  },
  {
    id: '85cc3239-bd8d-45a6-84e3-ebd6df1d5514',
    idExpense: '6a6f3fa4-c975-4ad8-bfec-9f1141cdc014',
    userEmail: 'xrafaelcruz@gmail.com',
    idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
    paymentValue: '0.475',
    paymentStatus: 'pendente',
    createdAt: '2022-07-13T03:29:07.148Z',
    updatedAt: '2022-07-13T03:29:07.148Z',
    expense: {
      id: '6a6f3fa4-c975-4ad8-bfec-9f1141cdc014',
      userEmail: 'andre.tanaka@prontmed.com',
      idGroup: '18576abc-a138-4c9c-b071-8f3e8703ef74',
      name: 'piscina do gugu',
      value: '0.95',
      description: '',
      type: 'não informado',
      createdAt: '2022-07-12T16:05:12.032Z',
      updatedAt: '2022-07-13T03:29:07.132Z',
      user: {
        id: '7f036084-68eb-4271-a171-209c957b10d0',
        email: 'andre.tanaka@prontmed.com',
        name: 'Andre Tanaka',
        password: '',
        photo:
          'https://lh3.googleusercontent.com/a-/AFdZucrk9bT4RqJN7-FgOWoWYxlx5XZ032O8CkxhnBSn=s96-c',
        pix: 'tanaka.s.andre@gmail.com',
        description: '',
        createdAt: '2022-07-12T15:43:59.074Z',
        updatedAt: '2022-07-12T15:48:26.696Z'
      }
    },
    user: {
      id: '3bf5bf25-9375-4601-8520-be9e0c91083c',
      email: 'xrafaelcruz@gmail.com',
      name: 'Rafael Cruz',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
      pix: '123',
      description: 'abc',
      createdAt: '2022-05-31T21:04:27.385Z',
      updatedAt: '2022-06-21T17:55:34.303Z'
    }
  }
]

export const mockExpenseList = [
  {
    id: '26d9412c-b137-4afe-b34e-2d5f5713af43',
    userEmail: 'xrafaelcruz@gmail.com',
    idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    name: 'Despesa1',
    value: '10',
    description: '',
    type: 'não informado',
    createdAt: '2022-06-01T20:52:31.152Z',
    updatedAt: '2022-06-01T20:52:31.152Z',
    user: {
      id: 'e502c025-6dfb-450b-b4f5-f4af9856f2d4',
      email: 'xrafaelcruz@gmail.com',
      name: 'Rafael Cruz',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
      pix: '123',
      description: 'abc',
      createdAt: '2022-05-31T21:04:27.385Z',
      updatedAt: '2022-06-21T17:55:34.303Z'
    }
  },
  {
    id: '2',
    userEmail: 'xrafaelcruz@gmail.com',
    idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    name: 'Despesa2',
    value: '20',
    description: '',
    type: 'não informado',
    createdAt: '2022-06-01T20:52:31.152Z',
    updatedAt: '2022-06-01T20:52:31.152Z',
    user: {
      id: '3bf5bf25-9375-4601-8520-be9e0c91083c',
      email: 'xrafaelcruz@gmail.com',
      name: 'Rafael Cruz',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
      pix: '123',
      description: 'abc',
      createdAt: '2022-05-31T21:04:27.385Z',
      updatedAt: '2022-06-21T17:55:34.303Z'
    }
  }
]

export const mockExpense = {
  id: '26d9412c-b137-4afe-b34e-2d5f5713af43',
  userEmail: 'xrafaelcruz@gmail.com',
  idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
  name: 'a',
  value: '10',
  description: '',
  type: 'não informado',
  createdAt: '2022-06-01T20:52:31.152Z',
  updatedAt: '2022-06-01T20:52:31.152Z',
  ExpenseUserGroup: [
    {
      id: 'd6249242-9e56-43dc-9926-da705bc33843',
      idExpense: '26d9412c-b137-4afe-b34e-2d5f5713af43',
      userEmail: 'xrafaelcruz@gmail.com',
      idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
      paymentValue: '5',
      paymentStatus: 'pagador',
      createdAt: '2022-06-01T20:52:31.164Z',
      updatedAt: '2022-06-01T20:52:31.165Z'
    },
    {
      id: '4c24bef1-ab4b-4813-9661-6ab8fcc2e74e',
      idExpense: '26d9412c-b137-4afe-b34e-2d5f5713af43',
      userEmail: 'rafaelcruzx@gmail.com',
      idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
      paymentValue: '5',
      paymentStatus: 'pendente',
      createdAt: '2022-06-01T20:52:31.164Z',
      updatedAt: '2022-06-01T20:52:31.165Z'
    }
  ]
}

export const mockGroupUsers = [
  {
    id: 'ed82781c-c680-426c-b4f0-e54e9421b60a',
    userEmail: 'xrafaelcruz@gmail.com',
    idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    inviteStatus: 'aceito',
    createdAt: '2022-05-31T21:05:05.894Z',
    updatedAt: '2022-05-31T21:05:05.894Z',
    user: {
      id: 'e502c025-6dfb-450b-b4f5-f4af9856f2d4',
      email: 'xrafaelcruz@gmail.com',
      name: 'Rafael Cruz',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
      pix: '123',
      description: 'abc',
      createdAt: '2022-05-31T21:04:27.385Z',
      updatedAt: '2022-06-21T17:55:34.303Z'
    }
  },
  {
    id: 'ebeba5fa-6e66-464e-bfcc-acd99cb5495d',
    userEmail: 'rafaelcruzx@gmail.com',
    idGroup: '6ca2e91d-ba2a-48c5-af7f-34ae441d1a84',
    inviteStatus: 'pendente',
    createdAt: '2022-05-31T21:05:05.894Z',
    updatedAt: '2022-05-31T21:05:05.894Z',
    user: {
      id: 'cf5bce23-0cb9-493d-b088-37e66089ec68',
      email: 'rafaelcruzx@gmail.com',
      name: 'Rafael Cruz',
      password: '',
      photo:
        'https://lh3.googleusercontent.com/a-/AOh14GiWFydrF_uBf0v1cx8faIvncYpKjCCocWHgKt43sA=s96-c',
      pix: '',
      description: '',
      createdAt: '2022-05-31T20:54:26.175Z',
      updatedAt: '2022-05-31T20:54:26.175Z'
    }
  }
]
