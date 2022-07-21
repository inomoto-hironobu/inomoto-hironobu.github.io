	
window.addEventListener('DOMContentLoaded',function(){
    const githubHistoryElement = document.getElementById('github-history');
    if(githubHistoryElement != null) {
        const githubHistoryLink = document
        .createElement('a');
        githubHistoryLink.setAttribute('href','https://github.com/inomoto-hironobu/inomoto-hironobu.github.io/commits/master'+window.location.pathname);
        githubHistoryLink.setAttribute('target','_blank');
        githubHistoryLink.appendChild(document.createTextNode('ファイルの変更履歴'));
        githubHistoryElement.appendChild(githubHistoryLink);
    }
});
