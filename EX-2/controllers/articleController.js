import articles from "../models/articleModel.js";

// GET /articles - List all articles
export const getAllArticles = (req, res) => {
    const { journalistId, categoryId } = req.query;
    let filteredArticles = articles;
    if (journalistId) {
        filteredArticles = filteredArticles.filter(article => article.journalistId === parseInt(journalistId));
    }
    if (categoryId) {
        filteredArticles = filteredArticles.filter(article => article.categoryId === parseInt(categoryId));
    }
    res.json(filteredArticles);
}

// GET /articles/:id - Get an article
export const getArticleById = (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
}

// POST /articles - Create new article
export const createNewArticle = (req, res) => {
    const { title, content, journalistId, categoryId } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newArticle = {
        id: articles.length + 1,
        title,
        content,
        journalistId, 
        categoryId
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
}

// PUT /articles/:id - Update article
export const updateArticleInfo = (req, res) => {
    const articleId = parseInt(req.params.id);
    const { title, content, journalistId, categoryId } = req.body;

    const article = articles.find(a => a.id === articleId);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (title) article.title = title;
    if (content) article.content = content;
    if (journalistId) article.journalistId = journalistId;
    if (categoryId) article.categoryId = categoryId;

    res.json(article);
}

// DELETE /articles/:id - Delete article
export const deleteArticle = (req, res) => {
    const articleId = parseInt(req.params.id);
    const index = articles.findIndex(a => a.id === articleId);
    if (index === -1) return res.status(404).json({ error: 'Article not found' });

    articles.splice(index, 1);
    res.status(204).send();
}
