
//metodos: index, show, update, store, destroy
/*
index: listagem de sessoes
store: Criar uma sessao
show: Quando queremos listar uma UNICA sessao
update: quando queremos alterar alguma sessao
destroy: quando queremos deletar uma sessao
*/ 

import User from '../models/User';
import * as YUP from 'yup';

class SessionController{

  async store(req, res){
    const schema = YUP.object().shape({
      email: YUP.string().email().required(),

    });

    const { email } = req.body;

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Falha na validação.'});

    }

    //Verificando se esse usuario já existe
    let user = await User.findOne({ email });

    if(!user){
      user = await User.create({ email });
    }
    
    return res.json(user);
  }

}

export default new SessionController();