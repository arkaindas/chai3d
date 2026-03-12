} else if(closestImpactStories) {
    const closestGridColumn = target.closest('.aem-GridColumn');
    
    const pushSectionData = (sectionText) => {
        dataLayer.push({
            event: 'hotspot_click1',
            client_id: clientId,
            title_name: titleName,
            section_name: sectionText
        });
    };

    const sectionTextEl = closestGridColumn?.querySelector('.cmp-text');
    
    if (sectionTextEl?.textContent?.trim()) {
        pushSectionData(sectionTextEl.textContent.trim());
    } else {
        const observer = new MutationObserver((mutations, obs) => {
            const el = closestGridColumn?.querySelector('.cmp-text');
            const text = el?.textContent?.trim();
            if (text) {
                pushSectionData(text);
                obs.disconnect();
            }
        });
        observer.observe(closestGridColumn, { 
            childList: true, 
            subtree: true 
        });
        setTimeout(() => {
            observer.disconnect();
            const fallback = closestGridColumn?.querySelector('.cmp-text')?.textContent?.trim() || '';
            pushSectionData(fallback);
        }, 3000);
    }
}
