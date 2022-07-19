export const mockUser = {
  createdAt: '2022-07-04T23:08:09.490Z',
  description: '',
  email: 'xrafaelcruz@gmail.com',
  id: '3bf5bf25-9375-4601-8520-be9e0c91083c',
  name: 'Rafael Cruz',
  password: '',
  photo:
    'https://lh3.googleusercontent.com/a-/AOh14GhuNWAaWWtnFy7VKaoiAVOkSPwr3wQAgqETMzpo6w=s96-c',
  pix: '',
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
