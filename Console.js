// Paste this entire block into console and press Enter
(function() {
    let s = document.querySelector('.offerings-main-container');
    console.log('offeringsSection exists:', !!s);
    console.log('_offeringsCleanup exists:', typeof s?._offeringsCleanup);
    
    let allButtons = s?.querySelectorAll('div[role="button"]');
    console.log('Total role=button divs:', allButtons?.length);
    allButtons?.forEach(function(b, i) {
        console.log('Button', i, '| tabindex:', b.getAttribute('tabindex'), '| offsetWidth:', b.offsetWidth, '| offsetLeft:', b.offsetLeft, '| aria-label:', b.getAttribute('aria-label'));
    });
    
    let labels = s?.querySelectorAll('.inactive-hotspot-label');
    console.log('Labels in DOM:', labels?.length);
    
    let img = s?.querySelector('img');
    console.log('Image complete:', img?.complete, '| naturalWidth:', img?.naturalWidth, '| src:', img?.src?.split('/').pop());
    
    console.log('pollInterval running:', !!s?._pollInterval);
})();
