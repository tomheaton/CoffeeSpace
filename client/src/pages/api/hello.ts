import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';

type Data = {
    name: string
}

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    return res.status(200).json({name: 'hello'})
}

export default handler;