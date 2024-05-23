chrome.tabs.onActivated.addListener( async ( activeInfo ) => {
  const tab = await chrome.tabs.get( activeInfo.tabId );
  const devToolsWindows = await chrome.windows
    .getAll( { populate : true, windowTypes : [ 'devtools' ] } );

  for( const devWindow of devToolsWindows ) {
    if( !devWindow?.tabs ) return;
    for( const tab of devWindow.tabs ) {
      if( tab?.url?.includes( activeInfo.tabId.toString() ) ) {
        await chrome.windows.update( devWindow.id as number, { focused : true } );
        return;
      }
    }
  }
} );
