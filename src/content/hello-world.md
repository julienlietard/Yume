---
title: "Hello, World — Bienvenue sur Yume"
description: "Premier article de Yume, mon blog et digital garden. Un espace pour partager ce que j'apprends sur React, TypeScript, design systems et l'architecture frontend."
date: "2026-03-01"
tags: ["meta", "react", "design-system", "architecture"]
author: "Julien Lietard"
coverImage: "/images/articles/hello-world.jpg"
published: true
---

# Hello, World — Bienvenue sur Yume

**Yume** (夢) signifie *rêve* en japonais. C'est aussi le nom de ce blog — un espace personnel pour penser à voix haute, documenter ce que j'apprends, et partager des retours d'expérience sur le développement frontend.

## Pourquoi ce blog ?

J'ai longtemps repoussé l'idée d'écrire publiquement. La peur du syndrome de l'imposteur, le manque de temps, la difficulté à trouver un angle original sur des sujets déjà couverts à l'infini.

Et puis j'ai relu quelque chose que j'avais noté il y a des mois :

> *"You don't have to be an expert to share what you know. You just have to be one step ahead of someone who needs it."*

Ce blog n'est pas là pour rivaliser avec les grandes publications tech. C'est un carnet de bord — honnête, imparfait, et mis à jour au fil de mes découvertes.

## Ce que tu trouveras ici

Les sujets qui m'occupent en ce moment :

- **React & TypeScript** — patterns avancés, performance, architecture applicative
- **Design systems** — concevoir, maintenir et consommer des librairies de composants (j'en construis une, [ju-design](https://github.com/julienlietard/ju-design))
- **Frontend architecture** — state management, routing, data fetching, tests
- **Developer experience** — outils, workflows, ce qui fait qu'un projet est agréable à maintenir

Je m'intéresse aussi à l'intersection entre design et développement. Pas en tant que designer, mais en tant que développeur qui pense que l'expérience utilisateur commence dans le code.

## La stack de Yume

Yume est lui-même un petit projet technique intéressant. Il démarre comme un blog statique (fichiers Markdown parsés au build) mais l'architecture est pensée pour évoluer vers quelque chose de plus ambitieux.

```typescript
// La couche data est abstraite dès le départ
// MVP : import.meta.glob sur des fichiers .md
// Futur : fetch('/api/articles/')

export async function getArticles(): Promise<ArticlePreview[]> {
  // Seul ce fichier changera quand l'API Django sera prête
}
```

**Stack actuelle :**

- React 18 + TypeScript
- Vite (bundler)
- React Router v6
- CSS Modules + design tokens via ju-design
- Déploiement sur Azure Static Web Apps

**Stack cible (roadmap) :**

- API REST Django + PostgreSQL
- Authentification JWT
- Éditeur d'articles en ligne
- Système de commentaires et réactions

## Un mot sur la régularité

Je ne vais pas promettre un article par semaine. Ce serait mentir.

Ce que je peux promettre : chaque article publié ici représente du temps investi pour que ce soit utile à quelqu'un d'autre que moi. Pas de contenu généré automatiquement, pas de listicles vides, pas de SEO bait.

Si tu veux être notifié des nouvelles publications, une newsletter arrivera bientôt.

---

À bientôt sur Yume. 🌙