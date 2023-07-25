const express = require('express');
const router = express.Router();
const Article=require("../models/article")

// afficher la liste des articles.
router.get('/', async (req, res )=> {
    try {
        const articles = await Article.find({}, null, {sort: {'_id': -1}}).populate("scategorieID").exec();
                
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
router.get('/productspage', async(req, res) => {
  const { page, pagesize } = req.query;

  // Calculez le nombre d'éléments à sauter (offset)
  const offset = (page - 1) * pagesize;
  try {
  // Effectuez la requête à votre source de données en utilisant les paramètres de pagination
  const articles = await Article.find( {}, null, {sort: {'_id': -1}})
    .skip(offset)
    .limit(pagesize).populate("scategorieID").exec()
   
  
    res.status(200).json(articles);
} catch (error) {
    res.status(404).json({ message: error.message });
}
});
// créer un nouvel article
router.post('/', async (req, res) =>  {
    
    const nouvarticle = new Article(req.body)

    try {
        await nouvarticle.save();

        res.status(200).json(nouvarticle );
    } catch (error) {
        res.status(404).json({ message: error.message });
    }


});
// chercher un article
router.get('/:articleId',async(req, res)=>{
    try {
        const art = await Article.findById(req.params.articleId);
        
        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// modifier un article


router.put('/:articleId', async (req, res)=> {
   try {
    
    const art = await Article.findByIdAndUpdate(
        req.params.articleId,
        { $set: req.body },
      { new: true }
    );
    res.status(200).json(art);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
});
// Supprimer un article
router.delete('/:articleId', async (req, res)=> {
    const  id  = req.params.articleId;
    await Article.findByIdAndDelete(id);

    res.json({ message: "article deleted successfully." });

});
module.exports = router;
